import HTTPTransport from '../modules/HTTPTransport';
import env from '../utils/env';

interface IBaseApi {
    baseUrl?: string;
    path?: `/${string}`;
    headers?: Record<string, string>;
}

const defaultHeaders = {
    'Content-type': 'application/json; charset=UTF-8',
};

export default abstract class BaseAPI {
    private _http: HTTPTransport;
    private _baseUrl: string;
    private _path: string;
    private _headers: Record<string, string>;

    constructor(config: IBaseApi = {}) {
        this._http = new HTTPTransport();

        this._baseUrl = config.baseUrl || env.HOST_API || '';
        this._path = config.path || '';
        this._headers = config.headers || defaultHeaders;
    }
    getPath() {
        return `${this._baseUrl}${this._path}`;
    }
    handleOptions(options: Record<any, any>) {
        options.headers = options.headers || this._headers;
        return options;
    }
    get headers() {
        return this._headers;
    }
    get(endpoint: `/${string}`, options: {}) {
        return this._http.get(
            this.getPath() + endpoint,
            this.handleOptions(options)
        );
    }
    post(endpoint: `/${string}`, options: {}) {
        return this._http.post(
            this.getPath() + endpoint,
            this.handleOptions(options)
        );
    }
}
