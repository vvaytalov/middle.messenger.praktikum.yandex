import { store } from '../store';
import { IChatMessage } from '../types/models';
import { getActiveChatId, getChatMessageById } from '../utils/chatSelectors';
import {
    resetMessageComposer,
    startMessageComposer,
    updateChatMessage,
} from '../utils/chatPageState';
import {
    getComposerTargetFromMessage,
    getMessageComposerState,
} from '../utils/messageSelectors';
import MessageController from './MessageWsController';

export interface IMessageActionBase {
    chatId: number;
}

export interface ISendMessageAction extends IMessageActionBase {
    type: 'send';
    content: string;
}

export interface IReplyMessageAction extends IMessageActionBase {
    type: 'reply';
    content: string;
    replyToMessageId: number;
}

export interface IEditMessageAction extends IMessageActionBase {
    type: 'edit';
    messageId: number;
    content: string;
}

export interface IDeleteMessageAction extends IMessageActionBase {
    type: 'delete';
    messageId: number;
}

export interface IForwardMessageAction extends IMessageActionBase {
    type: 'forward';
    messageId: number;
    targetChatId: number;
    content: string;
}

export type MessageAction =
    | ISendMessageAction
    | IReplyMessageAction
    | IEditMessageAction
    | IDeleteMessageAction
    | IForwardMessageAction;

class MessageActionsController {
    public execute(action: MessageAction) {
        switch (action.type) {
            case 'send':
                return this.send(action);
            case 'reply':
                return this.reply(action);
            case 'edit':
                return this.handleEdit(action);
            case 'delete':
                return this.handleDelete(action);
            case 'forward':
                return this.handleForward(action);
            default:
                return null;
        }
    }

    public send(action: Omit<ISendMessageAction, 'type'>) {
        if (action.chatId !== getActiveChatId(store.state)) {
            return false;
        }

        MessageController.sendMessage(action.content);
        resetMessageComposer();
        return true;
    }

    public reply(action: Omit<IReplyMessageAction, 'type'>) {
        if (action.chatId !== getActiveChatId(store.state)) {
            return false;
        }

        MessageController.sendMessage(action.content);
        resetMessageComposer();
        return true;
    }

    public edit(action: Omit<IEditMessageAction, 'type'>) {
        return this.execute({
            ...action,
            type: 'edit',
        });
    }

    public delete(action: Omit<IDeleteMessageAction, 'type'>) {
        return this.execute({
            ...action,
            type: 'delete',
        });
    }

    public forward(action: Omit<IForwardMessageAction, 'type'>) {
        return this.execute({
            ...action,
            type: 'forward',
        });
    }

    public submitComposer(message: string) {
        const activeChatId = getActiveChatId(store.state);
        const composer = getMessageComposerState(store.state);

        if (!activeChatId) {
            return false;
        }

        if (composer.mode === 'reply' && composer.target) {
            return this.reply({
                chatId: activeChatId,
                content: message,
                replyToMessageId: composer.target.id,
            });
        }

        if (composer.mode === 'edit' && composer.target) {
            return this.edit({
                chatId: activeChatId,
                content: message,
                messageId: composer.target.id,
            });
        }

        if (composer.mode === 'forward' && composer.target) {
            return this.forward({
                chatId: composer.target.chatId,
                content: composer.target.content,
                messageId: composer.target.id,
                targetChatId: activeChatId,
            });
        }

        return this.execute({
            type: 'send',
            chatId: activeChatId,
            content: message,
        });
    }

    public startReply(message: IChatMessage) {
        startMessageComposer('reply', getComposerTargetFromMessage(message));
    }

    public startEdit(message: IChatMessage) {
        startMessageComposer('edit', getComposerTargetFromMessage(message));
    }

    public startForward(message: IChatMessage) {
        startMessageComposer('forward', getComposerTargetFromMessage(message));
    }

    public cancelComposer() {
        resetMessageComposer();
    }

    private handleEdit(action: IEditMessageAction) {
        if (action.chatId !== getActiveChatId(store.state)) {
            return false;
        }

        const currentMessage = getChatMessageById(store.state, action.messageId);

        if (!currentMessage) {
            return false;
        }

        updateChatMessage(action.messageId, {
            content: action.content,
            edited_at: new Date().toISOString(),
            is_optimistic: false,
            pending_action: null,
        });
        resetMessageComposer();
        return true;
    }

    private handleDelete(action: IDeleteMessageAction) {
        if (action.chatId !== getActiveChatId(store.state)) {
            return false;
        }

        const currentMessage = getChatMessageById(store.state, action.messageId);

        if (!currentMessage) {
            return false;
        }

        updateChatMessage(action.messageId, {
            is_deleted: true,
            is_optimistic: false,
            pending_action: null,
        });
        return true;
    }

    private handleForward(action: IForwardMessageAction) {
        if (action.targetChatId !== getActiveChatId(store.state)) {
            return false;
        }

        MessageController.sendMessage(action.content);
        resetMessageComposer();
        return true;
    }
}

export default new MessageActionsController();
