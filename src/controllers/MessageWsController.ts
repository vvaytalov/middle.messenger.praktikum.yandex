import env from '../utils/env';
import {
    applyHistoryBatch,
    clearMessages,
    prependRealtimeChatMessage,
    setActiveChatToken,
    setMessageConnectionStatus,
} from '../utils/chatPageState';
import { getChatMessages } from '../utils/chatSelectors';
import {
    isMessageHistoryPayload,
    isRealtimeMessage,
} from '../utils/messageState';
import { showErrorToast, showInfoToast } from '../utils/toast';
import { MessageWebSocketAction, MessageWebSocketEvent } from '../utils/messageProtocol';
import { store } from '../store';

export interface IMessageWebSocketConnect {
    userId: number;
    chatId: number;
    token: string;
}

export interface IMessageWebSocketGet {
    offset: number;
}

class MessageController {
    private _ws: WebSocket | null = null;
    private _userId: number | null = null;
    private _chatId: number | null = null;
    private _token: string | null = null;
    private _ping: ReturnType<typeof setInterval> | null = null;
    private _reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    private _reconnectAttempts = 0;
    private _pendingActionsByChatId: Record<number, MessageWebSocketAction[]> = {};

    constructor() {
        this._handleOpen = this._handleOpen.bind(this);
        this._handleMassage = this._handleMassage.bind(this);
        this._handleError = this._handleError.bind(this);
        this._handleClose = this._handleClose.bind(this);
    }

    private _addEvents() {
        if (!this._ws) {
            return;
        }
        this._ws.addEventListener('open', this._handleOpen);
        this._ws.addEventListener('message', this._handleMassage);
        this._ws.addEventListener('error', this._handleError);
        this._ws.addEventListener('close', this._handleClose);
    }

    private _removeEvents() {
        if (!this._ws) {
            return;
        }
        this._ws.removeEventListener('open', this._handleOpen);
        this._ws.removeEventListener('message', this._handleMassage);
        this._ws.removeEventListener('error', this._handleError);
        this._ws.removeEventListener('close', this._handleClose);
    }

    private _handleOpen() {
        this._reconnectAttempts = 0;
        setMessageConnectionStatus('open');
        this.getMessages({ offset: 0 });
        this._flushPendingActions();
        this._ping = setInterval(() => {
            this._sendRawAction({ type: 'ping' });
        }, 10000);
    }

    private _handleMassage(evt: MessageEvent) {
        if (evt.currentTarget !== this._ws) {
            return;
        }

        const data = JSON.parse(evt.data) as MessageWebSocketEvent;

        if (isMessageHistoryPayload(data)) {
            if (!data.length) {
                if (!getChatMessages(store.state).length) {
                    clearMessages();
                }
                return;
            }

            applyHistoryBatch(data);
            return;
        }

        if (isRealtimeMessage(data)) {
            prependRealtimeChatMessage({
                ...data,
                pending_action: null,
                is_optimistic: false,
            });
        }
    }

    private _handleError(evt: ErrorEvent) {
        if (evt.currentTarget !== this._ws) {
            return;
        }

        setMessageConnectionStatus('error');
        showErrorToast(evt.message || 'ÐžÑˆÐ¸Ð±ÐºÐ° ÑÐ¾ÐµÐ´Ð¸Ð½ÐµÐ½Ð¸Ñ Ñ ÑÐµÑ€Ð²ÐµÑ€Ð¾Ð¼ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ð¹');
    }

    private _handleClose(evt: CloseEvent) {
        if (evt.currentTarget && evt.currentTarget !== this._ws) {
            return;
        }

        this._clearPing();
        this._removeEvents();

        if (this._ws && evt.currentTarget === this._ws) {
            this._ws = null;
        }

        setMessageConnectionStatus(
            evt.code === 1006 ? 'reconnecting' : 'closed',
        );

        if (!evt.wasClean && evt.code !== 1006) {
            showInfoToast('Ð¡Ð¾ÐµÐ´Ð¸Ð½ÐµÐ½Ð¸Ðµ Ñ Ñ‡Ð°Ñ‚Ð¾Ð¼ Ð·Ð°ÐºÑ€Ñ‹Ñ‚Ð¾');
        }

        if (evt.code === 1006) {
            this._scheduleReconnect();
        }
    }

    public connect(options: IMessageWebSocketConnect) {
        this._clearReconnectTimeout();
        this._clearPing();
        this._detachCurrentSocket();
        this._userId = options.userId;
        this._chatId = options.chatId;
        this._token = options.token;
        setActiveChatToken(options.token);
        setMessageConnectionStatus('connecting');
        this._ws = new WebSocket(
            `${env.HOST_WS}/${options.userId}/${options.chatId}/${options.token}`,
        );
        this._addEvents();
    }

    public getMessages(options: IMessageWebSocketGet) {
        this._sendRawAction({
            content: options.offset.toString(),
            type: 'get old',
        });
    }

    private _scheduleReconnect() {
        if (!this._userId || !this._chatId || !this._token) {
            return;
        }

        this._clearReconnectTimeout();
        const timeout = Math.min(1000 * 2 ** this._reconnectAttempts, 5000);
        this._reconnectAttempts += 1;
        this._reconnectTimeout = setTimeout(() => {
            this.connect({
                userId: this._userId as number,
                chatId: this._chatId as number,
                token: this._token as string,
            });
        }, timeout);
    }

    private _clearReconnectTimeout() {
        if (this._reconnectTimeout) {
            clearTimeout(this._reconnectTimeout);
            this._reconnectTimeout = null;
        }
    }

    private _clearPing() {
        if (this._ping) {
            clearInterval(this._ping);
            this._ping = null;
        }
    }

    private _detachCurrentSocket() {
        if (!this._ws) {
            return;
        }

        this._removeEvents();
        this._ws.close();
        this._ws = null;
    }

    private _flushPendingActions() {
        const activeChatId = this._chatId;

        if (!activeChatId || !this._pendingActionsByChatId[activeChatId]?.length) {
            return;
        }

        const queuedActions = [...this._pendingActionsByChatId[activeChatId]];
        this._pendingActionsByChatId[activeChatId] = [];
        queuedActions.forEach((action) => {
            this._sendRawAction(action);
        });
    }

    public leave() {
        this._clearReconnectTimeout();
        this._clearPing();
        this._pendingActionsByChatId = {};
        this._detachCurrentSocket();
        setActiveChatToken(null);
        setMessageConnectionStatus('closed');
    }

    public sendMessage(message: string) {
        return this._dispatchAction({
            content: message,
            type: 'message',
        });
    }

    private _queueAction(chatId: number, action: MessageWebSocketAction) {
        this._pendingActionsByChatId[chatId] = [
            ...(this._pendingActionsByChatId[chatId] || []),
            action,
        ];
    }

    private _sendRawAction(action: MessageWebSocketAction) {
        if (!this._ws || this._ws.readyState !== WebSocket.OPEN) {
            return false;
        }

        this._ws.send(JSON.stringify(action));
        return true;
    }

    private _dispatchAction(action: MessageWebSocketAction) {
        const activeChatId = this._chatId;

        if (!activeChatId) {
            return false;
        }

        if (!this._sendRawAction(action)) {
            this._queueAction(activeChatId, action);
        }

        return true;
    }
}

export default new MessageController();
