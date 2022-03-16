import BaseAPI from './BaseApi';

export interface IChatApiCreate {
    title: string;
}
export interface IChatApiAddUser {
    users: number[];
    chatId: number;
}

export interface IChatApiAddUser {
    users: number[];
    chatId: number;
}

class ChatAPI extends BaseAPI {
    constructor() {
        super({ path: '/chats' });
    }

    /**
     * Создать чат
     */
    public create(data?: IChatApiCreate) {
        return this.post('/', {
            withCredentials: true,
            data,
        });
    }

    /**
     * Получить чат
     */
    public request() {
        return this.get('/', {
            withCredentials: true,
        });
    }

    /**
     * Добавление пользователя
     */
    public addChatUser(data: IChatApiAddUser) {
        return this.put('/users', {
            withCredentials: true,
            data,
        });
    }

    /**
     * Получение токена пользователя
     */
    public addTokenUser(chatID: number) {
        return this.post(`/users/${chatID}`, {
            withCredentials: true,
        });
    }
}

export default new ChatAPI();
