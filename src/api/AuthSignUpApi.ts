import HTTPTransport from '../modules/HTTPTransport';
import env from '../utils/env';
import BaseApi from './BaseAPI';

export interface IAuthSignUpApi {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
}

type IAuthSignIn = Promise<string>;

const AUTH_API = new HTTPTransport(`${env.HOST_API}/auth`);

export default class AuthSignUpApi extends BaseApi {
    public request(user?: IAuthSignUpApi) {
        return AUTH_API.post<IAuthSignIn>('/signup', {
            headers: AuthSignUpApi.defaultHeaders,
            data: user,
        });
    }
}
