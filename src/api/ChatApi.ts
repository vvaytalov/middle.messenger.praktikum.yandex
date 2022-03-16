import BaseAPI from './BaseApi';

export interface IChatApiCreate {
    title: string;
}

export interface IChatApiAddUser {
    users: number[];
    chatId: number;
}

export default class ChatAPI extends BaseAPI {
    constructor() {
        super({ path: '/chats' });
    }
    public create(data?: IChatApiCreate) {
        return this.post('/', {
            withCredentials: true,
            data,
        });
    }

    public request() {
        return this.get('/', {
            withCredentials: true,
        });
    }
}
