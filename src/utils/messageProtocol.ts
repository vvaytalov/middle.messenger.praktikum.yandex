import { IChatMessage } from '../types/models';

export const SERVER_SUPPORTED_MESSAGE_ACTIONS = {
    getHistory: 'get old',
    ping: 'ping',
    send: 'message',
} as const;

// The current Praktikum chat WS API documents only history, ping and plain
// message send. These actions are UI/client state features until the backend
// exposes matching realtime events or REST endpoints.
export const CLIENT_ONLY_MESSAGE_ACTIONS = {
    reply: 'reply',
    edit: 'edit',
    delete: 'delete',
    forward: 'forward',
} as const;

export interface IMessageHistoryRequest {
    type: 'get old';
    content: string;
}

export interface IMessagePingRequest {
    type: 'ping';
}

export interface IMessageSendRequest {
    type: 'message';
    content: string;
}

export interface IClientReplyAction {
    type: 'reply';
    content: string;
    reply_to: number;
}

export interface IClientEditAction {
    type: 'edit';
    message_id: number;
    content: string;
}

export interface IClientDeleteAction {
    type: 'delete';
    message_id: number;
}

export interface IClientForwardAction {
    type: 'forward';
    message_id: number;
    target_chat_id: number;
}

export type MessageWebSocketAction =
    | IMessageHistoryRequest
    | IMessagePingRequest
    | IMessageSendRequest;

export type ClientOnlyMessageAction =
    | IClientReplyAction
    | IClientEditAction
    | IClientDeleteAction
    | IClientForwardAction;

export type MessageWebSocketEvent =
    | IChatMessage[]
    | IChatMessage;
