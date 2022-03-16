import MessageWSApi from '../api/MessageWS';

const messageWebSocket = new MessageWSApi();

export default class MessageWSController {
    public connect(userId: string, chatId: string, token: string) {
        messageWebSocket.connect(userId, chatId, token);
    }

    public send(message: string) {
        messageWebSocket.send(message);
    }
}
