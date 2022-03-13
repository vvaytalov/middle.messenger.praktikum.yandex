import { queryStringify } from '../utils/queryStringify';

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type IRequestData = Record<string, string | number>;
interface IOptions {
    method?: METHODS;
    headers?: Record<string, string>;
    timeout?: number;
    data?: unknown;
    withCredentials?: boolean;
}

class HTTPTransport {
    private _path: string;

    constructor(_path: string = '') {
        this._path = _path;
    }

    public get = <T>(url: string, options = {}): Promise<T> => {
        return this.request(url, { ...options, method: METHODS.GET });
    };

    public post = <T>(url: string, options = {}): Promise<T> => {
        return this.request(url, { ...options, method: METHODS.POST });
    };

    public put = <T>(url: string, options = {}): Promise<T> => {
        return this.request(url, { ...options, method: METHODS.PUT });
    };

    public patch = <T>(url: string, options = {}): Promise<T> => {
        return this.request(url, { ...options, method: METHODS.PATCH });
    };

    public delete = <T>(url: string, options = {}): Promise<T> => {
        return this.request(url, { ...options, method: METHODS.DELETE });
    };

    request = (url: string, options: IOptions): any => {
        const {
            method = METHODS.GET,
            headers = {},
            data,
            timeout = 5000,
            withCredentials = false,
        } = options;

        // Если метод GET и передана data, трансформировать data в query запрос
        const query =
            method === METHODS.GET ? queryStringify(data as IRequestData) : '';

        return new Promise((resolve, reject) => {
            const xhr = new window.XMLHttpRequest();

            xhr.open(method, this._path + url + query);

            if (withCredentials) {
                xhr.withCredentials = true;
            }

            Object.entries(headers).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
            });

            xhr.onload = () => {
                if (xhr.status >= 300) {
                    reject(xhr);
                } else {
                    resolve(xhr);
                }
            };

            xhr.onabort = () => reject(xhr);
            xhr.onerror = () => reject(xhr);
            xhr.timeout = timeout;
            xhr.ontimeout = () => reject(xhr);

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data as any);
            }
        });
    };
}

export default HTTPTransport;
