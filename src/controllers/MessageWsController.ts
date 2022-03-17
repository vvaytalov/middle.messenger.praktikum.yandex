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
        console.log('💬 _handleOpen');
        this.isConnected = true;
        this.getMessages({ offset: 0 });
    }

    private _handleMassage(evt: MessageEvent) {
        console.log('💬 _handleMassage', evt.data);
        const messages = JSON.parse(evt.data);
        if (Array.isArray(messages)) {
            store.setState({ messages });
        }
    }

    private _handleError(evt: ErrorEvent) {
        console.log('💬 _handleError', evt.message);
    }

    private _handleClose(evt: CloseEventInit) {
        this.isConnected = false;
        if (evt.wasClean) {
            console.log('💬 Соединение закрыто чисто');
        } else {
            console.log('💬 Обрыв соединения');
        }
        console.log(`💬 Код: ${evt.code} | Причина: ${evt.reason}`);
    }

    public connect(options: IMessageWebSocketConnect) {
        console.log(this._ws);

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

    public leave() {
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
