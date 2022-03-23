import BaseAPI from './BaseAPI';

export interface IAuthSignInApi {
    login: string;
    password: string;
}

export interface IAuthSignUpApi {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
}

class AuthAPI extends BaseAPI {
    constructor() {
        super({ path: '/auth' });
    }

    /**
     * Авторизация
     */
    public SignIn(data?: IAuthSignInApi) {
        return this.post('/signin', {
            withCredentials: true,
            data,
        });
    }

    /**
     * Регистрация
     */
    public SignUp(data?: IAuthSignUpApi) {
        return this.post('/signup', {
            data,
        });
    }

    /**
     * Проверка авторизации
     */
    public CheckAuth() {
        return this.get('/user', {
            withCredentials: true,
        });
    }

    /**
     * Логаут
     */
    public LogOut() {
        return this.post('/logout', {
            withCredentials: true,
        });
    }
}

export default new AuthAPI();
