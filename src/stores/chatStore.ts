import Store from '../modules/Store';

export const chatStore = new Store({
    chats: [],
    activeChatId: null,
});
