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
            data: JSON.stringify(data),
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
            data: JSON.stringify(data),
        });
    }

    /**
     * Получение токена пользователя
     */
    public addTokenUser(chatId: number) {
        return this.post(`/token/${chatId}`, {
            withCredentials: true,
        });
    }

    /**
     * Удаление пользователя из чата
     */
    public deleteUserChat(data: IChatApiAddUser) {
        return this.delete('/users', {
            withCredentials: true,
            data: JSON.stringify(data),
        });
    }

    /**
     * Запрос пользователей в чате
     */
    public requestUserChat(chatId: number) {
        return this.get(`/${chatId}/users`, {
            withCredentials: true,
        });
    }

    /**
     * Удалить чат
     */
    public removeChat(chatId: number) {
        return this.delete('/', {
            withCredentials: true,
            data: JSON.stringify({ chatId }),
        });
    }
}

export default new ChatAPI();
