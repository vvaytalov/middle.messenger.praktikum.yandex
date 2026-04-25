import Store from './modules/Store';
import { IAppState } from './types/models';
import { createInitialChatPageState } from './utils/chatPageState';

export const store = new Store<IAppState>({
    currentUser: null,
    chats: [],
    isChatsLoading: false,
    chatPage: createInitialChatPageState(),
});
