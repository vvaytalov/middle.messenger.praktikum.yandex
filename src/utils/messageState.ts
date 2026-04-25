import { IChatMessage } from '../types/models';

function dedupeMessages(messages: IChatMessage[]) {
    const seenIds = new Set<number>();

    return messages.filter((message) => {
        if (seenIds.has(message.id)) {
            return false;
        }

        seenIds.add(message.id);
        return true;
    });
}

export function isMessageHistoryPayload(data: unknown): data is IChatMessage[] {
    return Array.isArray(data);
}

export function isRealtimeMessage(data: unknown): data is IChatMessage {
    return (
        !Array.isArray(data)
        && typeof data === 'object'
        && data !== null
        && (data as { type?: unknown }).type === 'message'
    );
}

export function applyHistoryMessages(
    currentMessages: IChatMessage[],
    nextBatch: IChatMessage[],
) {
    if (!nextBatch.length) {
        return [];
    }

    if (nextBatch[0].id === 0) {
        return dedupeMessages(nextBatch);
    }

    return dedupeMessages([...currentMessages, ...nextBatch]);
}

export function prependRealtimeMessage(
    currentMessages: IChatMessage[],
    nextMessage: IChatMessage,
) {
    return dedupeMessages([nextMessage, ...currentMessages]);
}

export function updateMessageById(
    currentMessages: IChatMessage[],
    messageId: number,
    patch: Partial<IChatMessage>,
) {
    return currentMessages.map((message) => (
        message.id === messageId
            ? {
                ...message,
                ...patch,
            }
            : message
    ));
}

export function replaceMessageById(
    currentMessages: IChatMessage[],
    messageId: number,
    nextMessage: IChatMessage,
) {
    return currentMessages.map((message) => (
        message.id === messageId ? nextMessage : message
    ));
}

export function removeMessageById(
    currentMessages: IChatMessage[],
    messageId: number,
) {
    return currentMessages.filter((message) => message.id !== messageId);
}
