import { store } from '../store';
import {
    IActiveChatState,
    IChatMessage,
    IMessageComposerState,
    IMessageComposerTarget,
    IChatModalState,
    IChatPageState,
    IChatSearchState,
    MessageConnectionStatus,
} from '../types/models';
import { getChatMessages } from './chatSelectors';
import {
    applyHistoryMessages,
    prependRealtimeMessage,
    removeMessageById,
    replaceMessageById,
    updateMessageById,
} from './messageState';

export function createInitialChatPageState(): IChatPageState {
    return {
        search: {
            query: '',
            userResults: [],
            isLoading: false,
            hasQuery: false,
        },
        modal: {
            isNewChatOpen: false,
            isAddUserOpen: false,
            isDeleteUserOpen: false,
        },
        activeChat: {
            chatId: null,
            token: null,
        },
        messages: {
            items: [],
        },
        connection: {
            status: 'idle',
        },
        composer: {
            mode: 'idle',
            target: null,
        },
    };
}

function setChatPageState(nextState: IChatPageState) {
    store.setState({
        chatPage: nextState,
    });
}

function patchChatPageState(patch: Partial<IChatPageState>) {
    setChatPageState({
        ...store.state.chatPage,
        ...patch,
    });
}

function patchSearchState(patch: Partial<IChatSearchState>) {
    patchChatPageState({
        search: {
            ...store.state.chatPage.search,
            ...patch,
        },
    });
}

function patchModalState(patch: Partial<IChatModalState>) {
    patchChatPageState({
        modal: {
            ...store.state.chatPage.modal,
            ...patch,
        },
    });
}

function patchActiveChatState(patch: Partial<IActiveChatState>) {
    patchChatPageState({
        activeChat: {
            ...store.state.chatPage.activeChat,
            ...patch,
        },
    });
}

function patchMessagesState(messages: IChatMessage[]) {
    patchChatPageState({
        messages: {
            items: messages,
        },
    });
}

export function setChatSearchState(patch: Partial<IChatSearchState>) {
    patchSearchState(patch);
}

export function setChatSearchQuery(query: string) {
    patchSearchState({
        query,
    });
}

export function setChatModalState(patch: Partial<IChatModalState>) {
    patchModalState(patch);
}

export function setActiveChat(chatId: number | null, token?: string | null) {
    patchActiveChatState({
        chatId,
        ...(token !== undefined ? { token } : {}),
    });
}

export function setActiveChatToken(token: string | null) {
    patchActiveChatState({
        token,
    });
}

export function resetActiveChat() {
    patchChatPageState({
        activeChat: createInitialChatPageState().activeChat,
    });
}

export function replaceMessages(messages: IChatMessage[]) {
    patchMessagesState(messages);
}

export function clearMessages() {
    replaceMessages([]);
}

export function applyHistoryBatch(nextBatch: IChatMessage[]) {
    replaceMessages(
        applyHistoryMessages(getChatMessages(store.state), nextBatch),
    );
}

export function prependRealtimeChatMessage(nextMessage: IChatMessage) {
    replaceMessages(
        prependRealtimeMessage(getChatMessages(store.state), nextMessage),
    );
}

export function updateChatMessage(messageId: number, patch: Partial<IChatMessage>) {
    patchMessagesState(
        updateMessageById(getChatMessages(store.state), messageId, patch),
    );
}

export function replaceChatMessage(messageId: number, message: IChatMessage) {
    patchMessagesState(
        replaceMessageById(getChatMessages(store.state), messageId, message),
    );
}

export function removeChatMessage(messageId: number) {
    patchMessagesState(
        removeMessageById(getChatMessages(store.state), messageId),
    );
}

export function setMessageConnectionStatus(status: MessageConnectionStatus) {
    patchChatPageState({
        connection: {
            status,
        },
    });
}

export function setMessageComposerState(patch: Partial<IMessageComposerState>) {
    patchChatPageState({
        composer: {
            ...store.state.chatPage.composer,
            ...patch,
        },
    });
}

export function startMessageComposer(
    mode: IMessageComposerState['mode'],
    target: IMessageComposerTarget,
) {
    patchChatPageState({
        composer: {
            mode,
            target,
        },
    });
}

export function resetMessageComposer() {
    patchChatPageState({
        composer: createInitialChatPageState().composer,
    });
}

export function resetChatPageState() {
    setChatPageState(createInitialChatPageState());
}
