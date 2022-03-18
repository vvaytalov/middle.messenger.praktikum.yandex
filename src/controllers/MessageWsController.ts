import env from '../utils/env';
import { store } from '../store';

export interface IMessageWebSocketConnect {
    userId: number;
    chatId: number;
    token: string;
}

export interface IMessageWebSocketGet {
    offset: number;
}

class MessageController {
    private _ws: WebSocket;
    public isConnected: boolean;
    private _userId: number;
    private _chatId: number;
    private _token: string;
    private _ping: any;

    constructor() {
        this.isConnected = false;
        this._handleOpen = this._handleOpen.bind(this);
        this._handleMassage = this._handleMassage.bind(this);
        this._handleError = this._handleError.bind(this);
        this._handleClose = this._handleClose.bind(this);
    }

    private _addEvents() {
        this._ws.addEventListener('open', this._handleOpen);
        this._ws.addEventListener('message', this._handleMassage);
        this._ws.addEventListener('error', this._handleError);
        this._ws.addEventListener('close', this._handleClose);
    }

    private _removeEvents() {
        this._ws.removeEventListener('open', this._handleOpen);
        this._ws.removeEventListener('message', this._handleMassage);
        this._ws.removeEventListener('error', this._handleError);
        this._ws.removeEventListener('close', this._handleClose);
    }

    private _handleOpen() {
        this.getMessages({ offset: 0 });
        this._ping = setInterval(() => {
            // this._ws.send('');
        });
    }

    private _handleMassage(evt: MessageEvent) {
        console.log('💬 _handleMassage', evt.data);
        const data = JSON.parse(evt.data);

        if (Array.isArray(data)) {
            store.setState({ messages: data });
        } else if (typeof data === 'object' && data.type === 'message') {
            const message = [data, ...store.state.messages];
            store.setState({ message });
        }
    }

    private _handleError(evt: ErrorEvent) {
        console.log('💬 _handleError', evt.message);
    }

    private _handleClose(evt: CloseEventInit) {
        this._removeEvents();
        if (evt.wasClean) {
            console.log('💬 Соединение закрыто чисто');
        } else {
            console.log('💬 Обрыв соединения');
        }
        if (evt.code === 1006) {
            this._reconaction();
        }
    }

    public connect(options: IMessageWebSocketConnect) {
        this._userId = options.userId;
        this._chatId = options.chatId;
        this._token = options.token;
        this._ws = new WebSocket(
            `${env.HOST_WS}/${options.userId}/${options.chatId}/${options.token}`
        );
        this._addEvents();
    }

    public getMessages(options: IMessageWebSocketGet) {
        this._ws.send(
            JSON.stringify({
                content: options.offset.toString(),
                type: 'get old',
            })
        );
    }

    private _reconaction() {
        this.connect({
            userId: this._userId,
            chatId: this._chatId,
            token: this._token,
        });
    }

    public leave() {
        clearInterval(this._ping);
        this._ws.close();
        this._removeEvents();
    }

    public sendMessage(message: string) {
        this._ws.send(
            JSON.stringify({
                content: message,
                type: 'message',
            })
        );
    }
}

export default new MessageController();
