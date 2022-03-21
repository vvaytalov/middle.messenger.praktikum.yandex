import BaseApi from './BaseAPI';

export interface IUserAPI {
    login: string;
}

class UserAPI extends BaseApi {
    constructor() {
        super({ path: '/user' });
    }

    /**
     * Поиск пользователя
     */
    public search(data?: IUserAPI) {
        return this.post('/search', {
            withCredentials: true,
            data: JSON.stringify(data),
        });
    }

    /**
     * Обновить данные в профиле
     */
    public updateProfile(data?: IUserAPI) {
        return this.put('/profile', {
            withCredentials: true,
            data: JSON.stringify(data),
        });
    }

    /**
     * Обновить аватар
     */
    public updateAvatar(data?: FormData) {
        return this.put('/profile/avatar', {
            headers: {},
            withCredentials: true,
            data,
        });
    }
}

export default new UserAPI();
