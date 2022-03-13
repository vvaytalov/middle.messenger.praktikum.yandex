import HTTPTransport from '../modules/HTTPTransport';
import env from '../utils/env';
import BaseApi from './BaseAPI';

export interface IAuthSignInApi {
    login: string;
    password: string;
}

type IAuthSignIn = Promise<string>;

const AUTH_API = new HTTPTransport(`${env.HOST_API}/auth`);

export default class AuthSignInApi extends BaseApi {
    public request(user?: IAuthSignInApi) {
        return AUTH_API.post<IAuthSignIn>('/signin', {
            headers: AuthSignInApi.defaultHeaders,
            withCredentials: true,
            data: user,
        });
    }
}
