export interface IUser {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string | null;
    login: string;
    email: string;
    phone: string;
    avatar: string | null;
}

export interface IChatLastMessage {
    user: IUser;
    time: string;
    content: string;
}

export interface IChat {
    id: number;
    title: string;
    avatar: string | null;
    unread_count: number;
    created_by: number;
    last_message: IChatLastMessage | null;
}

export interface IChatMessage {
    id: number;
    chat_id: number;
    user_id: number;
    type: string;
    content: string;
    file: string | null;
    is_read: boolean;
    time: string;
    avatar: string | null;
    reply_to?: number | null;
    edited_at?: string | null;
    is_deleted?: boolean;
    pending_action?: MessagePendingAction | null;
    is_optimistic?: boolean;
}

export type MessageConnectionStatus =
    | 'idle'
    | 'connecting'
    | 'open'
    | 'closed'
    | 'error'
    | 'reconnecting';

export interface IChatSearchState {
    query: string;
    userResults: IUser[];
    isLoading: boolean;
    hasQuery: boolean;
}

export interface IChatModalState {
    isNewChatOpen: boolean;
    isAddUserOpen: boolean;
    isDeleteUserOpen: boolean;
}

export interface IActiveChatState {
    chatId: number | null;
    token: string | null;
}

export interface IMessageListState {
    items: IChatMessage[];
}

export interface IChatConnectionState {
    status: MessageConnectionStatus;
}

export type MessageComposerMode = 'idle' | 'reply' | 'edit' | 'forward';

export type MessagePendingAction = 'send' | 'reply' | 'edit' | 'delete' | 'forward';

export interface IMessageComposerTarget {
    id: number;
    chatId: number;
    userId: number;
    content: string;
}

export interface IMessageComposerState {
    mode: MessageComposerMode;
    target: IMessageComposerTarget | null;
}

export interface IMessageListItem {
    id: number;
    chat_id: number;
    user_id: number;
    type: string;
    content: string;
    file: string | null;
    is_read: boolean;
    time: string;
    avatar: string | null;
    isOwnMessage: boolean;
    canReply: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canForward: boolean;
    isEdited: boolean;
    isDeleted: boolean;
    isPending: boolean;
    pendingAction: MessagePendingAction | null;
    replyPreview: string | null;
}

export interface IChatPageState {
    search: IChatSearchState;
    modal: IChatModalState;
    activeChat: IActiveChatState;
    messages: IMessageListState;
    connection: IChatConnectionState;
    composer: IMessageComposerState;
}

export interface IAppState {
    currentUser: IUser | null;
    chats: IChat[];
    isChatsLoading: boolean;
    chatPage: IChatPageState;
}
