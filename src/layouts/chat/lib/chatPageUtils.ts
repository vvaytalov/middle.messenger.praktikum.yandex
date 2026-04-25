import { IChat } from '../../../types/models';

export function normalizeChatSearchQuery(query: string) {
    return query.trim().toLowerCase();
}

export function filterChatsByQuery(chats: IChat[], query: string) {
    const normalizedQuery = normalizeChatSearchQuery(query);

    if (!normalizedQuery) {
        return chats;
    }

    return chats.filter((chat) => {
        const title = String(chat.title || '').toLowerCase();
        const lastMessage = String(chat.last_message?.content || '').toLowerCase();

        return (
            title.includes(normalizedQuery) ||
            lastMessage.includes(normalizedQuery)
        );
    });
}

export function shouldSearchUsers(query: string) {
    return normalizeChatSearchQuery(query).length >= 3;
}
