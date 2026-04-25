const CHAT_DRAFTS_STORAGE_KEY = 'chat-message-drafts';

type ChatDraftsMap = Record<string, string>;

function readDrafts(): ChatDraftsMap {
    const rawDrafts = localStorage.getItem(CHAT_DRAFTS_STORAGE_KEY);

    if (!rawDrafts) {
        return {};
    }

    try {
        return JSON.parse(rawDrafts) as ChatDraftsMap;
    } catch {
        return {};
    }
}

function writeDrafts(drafts: ChatDraftsMap) {
    localStorage.setItem(CHAT_DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
}

export function getChatDraft(chatId: number | null) {
    if (!chatId) {
        return '';
    }

    const drafts = readDrafts();
    return drafts[String(chatId)] || '';
}

export function saveChatDraft(chatId: number | null, value: string) {
    if (!chatId) {
        return;
    }

    const drafts = readDrafts();
    drafts[String(chatId)] = value;
    writeDrafts(drafts);
}

export function clearChatDraft(chatId: number | null) {
    if (!chatId) {
        return;
    }

    const drafts = readDrafts();
    delete drafts[String(chatId)];
    writeDrafts(drafts);
}
