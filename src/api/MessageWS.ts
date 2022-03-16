import env from '../utils/env';

export default class MessageWSAPI {
    private _ws: WebSocket;

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
        console.log('Соединение установлено');
    }

    private _handleMassage(evt: any) {
        console.log('Получены данные', evt.data);
    }

    private _handleError(evt: any) {
        console.log('Ошибка', evt.message);
    }

    private _handleClose(evt: any) {
        if (evt.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения');
        }
        console.log(`Код: ${evt.code} | Причина: ${evt.reason}`);
    }

    public connect(userId: string, chatId: string, token: string) {
        this._ws = new WebSocket(
            `${env.HOST_WS}/chats/${userId}/${chatId}/${token}`
        );
        this._addEvents();
    }

    // public subscribe(action: string, cb: () => {}) {
    //   cb(payload);
    // }

    public leave() {
        this._ws.close();
        this._removeEvents();
    }

    public send(message: string) {
        this._ws.send(
            JSON.stringify({
                content: message,
                type: 'message',
            })
        );
    }
}
