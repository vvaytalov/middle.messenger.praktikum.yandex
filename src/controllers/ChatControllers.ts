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
            .then((xhr) => {
                return JSON.parse(xhr.response);
            })
            .catch(handleError)
            .finally(() => {
                hideSpinner();
            });
    }

    public request() {
        showSpinner();
        return ChatApi.request()
            .then((xhr) => {
                const response = JSON.parse(xhr.response);
                store.setState({
                    chats: response,
                });
                if (!store.state.chatId) {
                    store.setState({
                        chatId: response[0]?.id || null,
                    });
                }
                return response;
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
            .then((xhr) => {
                const response = JSON.parse(xhr.response);
                return response;
            })
            .catch(handleError);
    }

    public requestMessageToken(chatId: number) {
        return ChatApi.addTokenUser(chatId)
            .then((xhr) => {
                return JSON.parse(xhr.response);
            })
            .catch(handleError);
    }
}

export default new ChatController();
