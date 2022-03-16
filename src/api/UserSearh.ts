import BaseApi from './BaseAPI';

export interface IUserAPI {
    login: string;
}

export default class UserAPI extends BaseApi {
    constructor() {
        super({ path: '/user' });
    }

    /**
     * Авторизация
     */
    public search(data?: IUserAPI) {
        return this.post('/search', {
            withCredentials: true,
            data,
        });
    }
}
