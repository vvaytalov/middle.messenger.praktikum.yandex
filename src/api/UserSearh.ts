import BaseApi from './BaseAPI';

export interface IUserAPI {
    login: string;
}

class UserAPI extends BaseApi {
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

export default new UserAPI();
