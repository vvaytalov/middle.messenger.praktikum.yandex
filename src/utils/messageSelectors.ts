import {
    IAppState,
    IChatMessage,
    IMessageComposerTarget,
    IMessageListItem,
} from '../types/models';
import { getChatMessages } from './chatSelectors';

function toComposerTarget(message: IChatMessage): IMessageComposerTarget {
    return {
        id: message.id,
        chatId: message.chat_id,
        userId: message.user_id,
        content: message.content,
    };
}

export function getMessageComposerState(state: IAppState) {
    return state.chatPage.composer;
}

export function getMessageComposerTarget(state: IAppState) {
    return state.chatPage.composer.target;
}

export function getMessageListItems(state: IAppState): IMessageListItem[] {
    const currentUserId = state.currentUser?.id;
    const messages = getChatMessages(state);
    const messagesById = new Map(
        messages.map((message) => [message.id, message]),
    );

    return messages.map((message) => {
        const isOwnMessage = message.user_id === currentUserId;
        const isDeleted = Boolean(message.is_deleted);
        const replyMessage = message.reply_to
            ? messagesById.get(message.reply_to) || null
            : null;

        return {
            ...message,
            content: isDeleted ? 'Message deleted' : message.content,
            isOwnMessage,
            canReply: !isDeleted,
            canEdit: isOwnMessage && !isDeleted,
            canDelete: isOwnMessage && !isDeleted,
            canForward: true,
            isEdited: Boolean(message.edited_at),
            isDeleted,
            isPending: Boolean(message.pending_action),
            pendingAction: message.pending_action || null,
            replyPreview: replyMessage?.content || null,
        };
    });
}

export function getComposerTargetFromMessage(message: IChatMessage) {
    return toComposerTarget(message);
}
