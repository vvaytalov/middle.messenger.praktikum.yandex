import ChatApi, { IChatApiCreate } from '../api/ChatApi';
import { router } from '../index';
import { store } from '../store';
import { handleError } from '../utils/handleError';
import { hideSpinner, showSpinner } from '../utils/spinner';
import { getActiveChatId } from '../utils/chatSelectors';
import {
    clearMessages,
    resetActiveChat,
    setActiveChat,
} from '../utils/chatPageState';
import { showErrorToast } from '../utils/toast';
import MessageController from './MessageWsController';

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
        store.setState({
            isChatsLoading: true,
        });
        showSpinner();
        return ChatApi.request()
            .then((chats) => {
                store.setState({
                    chats,
                });
                if (!getActiveChatId(store.state)) {
                    setActiveChat(chats[0]?.id || null, null);
                }
                return chats;
            })
            .catch((error) => {
                router.go('/sign-in');
                handleError(error);
            })
            .finally(() => {
                store.setState({
                    isChatsLoading: false,
                });
                hideSpinner();
            });
    }

    public addUserChat(data: IChatApiAddUser) {
        return ChatApi.addChatUser(data)
            .then(() => {
                MessageController.sendMessage('Пользователь добавлен в чат');
            })
            .catch(handleError);
    }

    public deleteUserChat(data: IChatApiAddUser) {
        return ChatApi.deleteUserChat(data)
            .then(() => undefined)
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

    public removeChat(chatId: number = getActiveChatId(store.state) || 0) {
        if (!chatId) {
            showErrorToast('Чат не выбран');
            return Promise.resolve(null);
        }

        const isActiveChat = chatId === getActiveChatId(store.state);

        if (isActiveChat) {
            MessageController.leave();
            clearMessages();
        }

        return ChatApi.removeChat(chatId).then(() => {
            return this.request().then((chats) => {
                if (!isActiveChat) {
                    return chats;
                }

                const nextChatId = chats?.[0]?.id || null;
                if (!nextChatId) {
                    resetActiveChat();
                } else {
                    setActiveChat(nextChatId, null);
                }

                const currentUser = store.state.currentUser;

                if (!nextChatId || !currentUser) {
                    return chats;
                }

                return this.requestMessageToken(nextChatId).then(({ token }) => {
                    MessageController.connect({
                        userId: currentUser.id,
                        chatId: nextChatId,
                        token,
                    });
                    return chats;
                });
            });
        });
    }
}

export default new ChatController();
