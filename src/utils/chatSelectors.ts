import { IAppState, IChat } from '../types/models';

export function getActiveChat(state: IAppState): IChat | null {
    return (
        state.chats.find((chat) => chat.id === state.chatPage.activeChat.chatId) ||
        null
    );
}

export function getActiveChatId(state: IAppState) {
    return state.chatPage.activeChat.chatId;
}

export function getActiveChatToken(state: IAppState) {
    return state.chatPage.activeChat.token;
}

export function getChatMessages(state: IAppState) {
    return state.chatPage.messages.items;
}

export function getChatSearchQuery(state: IAppState) {
    return state.chatPage.search.query;
}

export function getChatMessageById(state: IAppState, messageId: number) {
    return state.chatPage.messages.items.find((message) => message.id === messageId)
        || null;
}

export function getMessageConnectionStatus(state: IAppState) {
    return state.chatPage.connection.status;
}

export function hasActiveChat(state: IAppState) {
    return Boolean(getActiveChatId(state));
}
