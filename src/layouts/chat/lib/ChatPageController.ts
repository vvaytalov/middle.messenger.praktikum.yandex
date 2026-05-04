import {
    ChatController,
    MessageActionsController,
    MessageController,
    UserController,
} from '../../../controllers';
import { store } from '../../../store';
import { IAppState, IChat, IUser } from '../../../types/models';
import debounce from '../../../utils/debounce';
import {
    getActiveChatId,
    getActiveChatToken,
    getChatMessageById,
    hasActiveChat,
} from '../../../utils/chatSelectors';
import {
    getMessageComposerState,
    getMessageListItems,
} from '../../../utils/messageSelectors';
import {
    clearMessages,
    resetMessageComposer,
    resetChatPageState,
    setActiveChat,
    setChatSearchState,
    setChatSearchQuery,
} from '../../../utils/chatPageState';
import { showErrorToast, showInfoToast, showSuccessToast } from '../../../utils/toast';
import {
    filterChatsByQuery,
    normalizeChatSearchQuery,
    shouldSearchUsers,
} from './chatPageUtils';

interface IChatListState {
    chats: IChat[];
    isLoading?: boolean;
    hasQuery: boolean;
}

interface IUserSearchState {
    users?: IUser[];
    isLoading?: boolean;
    hasQuery?: boolean;
    canAddToChat?: boolean;
}

interface IChatPageControllerOptions {
    getSearchQuery: () => string;
    setSearchQuery: (value: string) => void;
    setChatListState: (state: IChatListState) => void;
    setUserSearchState: (state: IUserSearchState) => void;
    setMessageListState: (messages: ReturnType<typeof getMessageListItems>) => void;
    setMessageInputChatId: (chatId: number | null) => void;
    setMessageComposerState: (state: ReturnType<typeof getMessageComposerState>) => void;
    scrollToLastMessage: () => void;
}

export default class ChatPageController {
    private searchRequestId = 0;

    private activeChatRequestId = 0;

    private unsubscribers: Array<() => void> = [];

    private options: IChatPageControllerOptions;

    constructor(options: IChatPageControllerOptions) {
        this.options = options;
    }

    public readonly handleSearchInput = debounce((value: string) => {
        const normalizedQuery = normalizeChatSearchQuery(value);
        const filteredChats = filterChatsByQuery(store.state.chats, value);

        setChatSearchQuery(value);
        this.options.setSearchQuery(value);
        this.options.setChatListState({
            chats: filteredChats,
            hasQuery: Boolean(normalizedQuery),
        });
        setChatSearchState({
            userResults: [],
            isLoading: false,
            hasQuery: Boolean(normalizedQuery),
        });

        if (!shouldSearchUsers(value)) {
            setChatSearchState({
                userResults: [],
                isLoading: false,
                hasQuery: false,
            });
            this.options.setUserSearchState({
                users: [],
                isLoading: false,
                hasQuery: false,
                canAddToChat: Boolean(getActiveChatId(store.state)),
            });
            return;
        }

        this.searchRequestId += 1;
        const currentRequestId = this.searchRequestId;

        setChatSearchState({
            userResults: [],
            isLoading: true,
            hasQuery: true,
        });
        this.options.setUserSearchState({
            users: [],
            isLoading: true,
            hasQuery: true,
            canAddToChat: Boolean(getActiveChatId(store.state)),
        });

        UserController.search({ login: value }).then((users: IUser[]) => {
            if (currentRequestId !== this.searchRequestId) {
                return;
            }

            setChatSearchState({
                userResults: users,
                isLoading: false,
                hasQuery: true,
            });
            this.options.setUserSearchState({
                users,
                isLoading: false,
                hasQuery: true,
                canAddToChat: Boolean(getActiveChatId(store.state)),
            });
        });
    }, 250);

    public mount() {
        const storedChatId = localStorage.getItem('last_select-chat_id');

        if (storedChatId) {
            setActiveChat(Number(storedChatId), null);
        }

        ChatController.request().then(() => {
            this.requestChat(getActiveChatId(store.state), this.createActiveChatRequestId());
        });

        this.unsubscribers.push(
            store.subscribe((state: IAppState) => {
                const query = this.options.getSearchQuery();
                const normalizedQuery = normalizeChatSearchQuery(query);

                this.options.setChatListState({
                    chats: filterChatsByQuery(state.chats, query),
                    isLoading: state.isChatsLoading,
                    hasQuery: Boolean(normalizedQuery),
                });
                this.options.setUserSearchState({
                    canAddToChat: hasActiveChat(state),
                });
            }),
        );

        this.unsubscribers.push(
            store.subscribe((state: IAppState) => {
                this.options.setMessageListState(getMessageListItems(state));
                this.options.setMessageInputChatId(getActiveChatId(state));
                this.options.setMessageComposerState(getMessageComposerState(state));
            }),
        );
    }

    public destroy() {
        this.createActiveChatRequestId();
        this.unsubscribers.forEach((unsubscribe) => unsubscribe());
        this.unsubscribers = [];

        if (store.state.chats.length) {
            MessageController.leave();
        }

        store.setState({ chats: [] });
        resetChatPageState();
    }

    public handleChatSelect(chatId: number) {
        clearMessages();
        MessageController.leave();
        this.syncComposerOnChatSwitch(chatId);
        setActiveChat(chatId, null);
        localStorage.setItem('last_select-chat_id', `${chatId}`);
        this.requestChat(chatId, this.createActiveChatRequestId());
    }

    public handleDeleteChat(chatId: number) {
        return ChatController.removeChat(chatId).then((result) => {
            if (result !== null) {
                showSuccessToast('Чат удален');
            }
        });
    }

    public handleRemoveActiveChat() {
        return this.handleDeleteChat(getActiveChatId(store.state) || 0);
    }

    public handleMessageListEnd(length: number) {
        if (length && length % 20 === 0) {
            MessageController.getMessages({ offset: length });
        }
    }

    public handleMessageReply(messageId: number) {
        const message = getChatMessageById(store.state, messageId);

        if (message) {
            MessageActionsController.startReply(message);
        }
    }

    public handleMessageEdit(messageId: number) {
        const message = getChatMessageById(store.state, messageId);

        if (message) {
            MessageActionsController.startEdit(message);
        }
    }

    public handleMessageDelete(messageId: number) {
        const activeChatId = getActiveChatId(store.state);

        if (!activeChatId) {
            return false;
        }

        return MessageActionsController.delete({
            chatId: activeChatId,
            messageId,
        });
    }

    public handleMessageForward(messageId: number) {
        const message = getChatMessageById(store.state, messageId);

        if (!message) {
            return;
        }

        MessageActionsController.startForward(message);
        showInfoToast('Пересылка подготовлена в composer state');
    }

    public handleComposerSubmit(message: string) {
        const isSent = MessageActionsController.submitComposer(message);

        if (isSent) {
            this.options.scrollToLastMessage();
        }
    }

    public handleComposerCancel() {
        MessageActionsController.cancelComposer();
    }

    public handleAddUser(userId: number, users: IUser[]) {
        const activeChatId = getActiveChatId(store.state);

        if (!activeChatId) {
            showErrorToast('Сначала выберите чат');
            return Promise.resolve(users);
        }

        return ChatController.addUserChat({
            users: [userId],
            chatId: activeChatId,
        }).then(() => {
            showSuccessToast('Пользователь добавлен в текущий чат');
            return users.filter((user) => user.id !== userId);
        });
    }

    public handleCreateChat(title: string) {
        return ChatController.create({ title }).then(() => {
            showSuccessToast('Чат создан');
        });
    }

    public requestChat(chatId: number | null, requestId: number) {
        if (!chatId) {
            return;
        }

        ChatController.requestMessageToken(chatId).then((response) => {
            const token = response?.token;

            if (this.isStaleChatRequest(chatId, requestId)) {
                return;
            }

            if (!token) {
                return;
            }

            setActiveChat(chatId, token);
            this.requestMessages(chatId, token, requestId);
        });
    }

    private requestMessages(
        chatId: number,
        token: string = getActiveChatToken(store.state) || '',
        requestId: number = this.activeChatRequestId,
    ) {
        if (
            !store.state.currentUser
            || !chatId
            || !token
            || this.isStaleChatRequest(chatId, requestId)
        ) {
            return;
        }

        MessageController.connect({
            userId: store.state.currentUser.id,
            chatId,
            token,
        });
    }

    private createActiveChatRequestId() {
        this.activeChatRequestId += 1;
        return this.activeChatRequestId;
    }

    private isStaleChatRequest(chatId: number, requestId: number) {
        return (
            requestId !== this.activeChatRequestId
            || getActiveChatId(store.state) !== chatId
        );
    }

    private syncComposerOnChatSwitch(nextChatId: number) {
        const composer = getMessageComposerState(store.state);

        if (
            composer.mode === 'idle'
            || !composer.target
            || composer.target.chatId === nextChatId
            || composer.mode === 'forward'
        ) {
            return;
        }

        resetMessageComposer();
    }
}
