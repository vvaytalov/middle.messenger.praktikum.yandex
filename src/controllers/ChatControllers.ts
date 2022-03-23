import ChatApi, { IChatApiCreate } from '../api/ChatApi';
import { router } from '../index';
import { store } from '../store';
import { handleError } from '../utils/handleError';
import { hideSpinner, showSpinner } from '../utils/spinner';

export interface IChatApiAddUser {
    users: number[];
    chatId: number;
}

class ChatController {
    public create(data: IChatApiCreate) {
        showSpinner();
        return ChatApi.create(data)
            .then((chat) => {
                return chat.id;
            })
            .then(() => {
                return this.request();
            })
            .catch(handleError)
            .finally(() => {
                hideSpinner();
            });
    }

    public request() {
        showSpinner();
        return ChatApi.request()
            .then((chats) => {
                store.setState({
                    chats,
                });
                if (!store.state.chatId) {
                    store.setState({
                        chatId: chats[0]?.id || null,
                    });
                }
                return chats;
            })
            .catch((error) => {
                router.go('/sign-in');
                handleError(error);
            })
            .finally(() => {
                hideSpinner();
            });
    }

    public addUserChat(data: IChatApiAddUser) {
        return ChatApi.addChatUser(data)
            .then(() => {
                throw new Error('Пользователь добавлен');
            })
            .catch(handleError);
    }

    public deleteUserChat(data: IChatApiAddUser) {
        return ChatApi.deleteUserChat(data)
            .then(() => {
                console.log('Пользователь удален');
            })
            .catch(handleError);
    }

    public requestUserChat(chatId: number) {
        return ChatApi.requestUserChat(chatId)
            .then((users) => {
                return users;
            })
            .catch(handleError);
    }

    public requestMessageToken(chatId: number) {
        return ChatApi.addTokenUser(chatId)
            .then((auth) => {
                return auth;
            })
            .catch(handleError);
    }

    public removeChat() {
        return ChatApi.removeChat(store.state.chatId).then(() => {
            this.request();
        });
    }
}

export default new ChatController();
