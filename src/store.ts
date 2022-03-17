import Store from './modules/Store';

export const store = new Store({
    currentUser: null,
    chatId: null,
    token: null,
    chats: [],
    messages: [],
});
