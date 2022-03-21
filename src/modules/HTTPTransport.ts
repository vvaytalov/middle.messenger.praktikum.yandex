enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type TRequestData = Record<string, string | number>;

export type TRequestOptions = {
    method?: METHODS;
    headers?: Record<string, string>;
    timeout?: number;
    data?: unknown;
    withCredentials?: boolean;
};

function queryStringify(data: TRequestData) {
    if (!data) return '';
    return Object.entries(data).reduce((acc, [key, value], index, arr) => {
        return `${acc}${key}=${value}${index < arr.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    private _parentPath: string;

    constructor(_parentPath: string = '') {
        this._parentPath = _parentPath;
    }

    public get = (url: string, options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.GET });
    };

    public post = (url: string, options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.POST });
    };

    public put = (url: string, options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.PUT });
    };

    public patch = (url: string, options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.PATCH });
    };

    public delete = (url: string, options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.DELETE });
    };

    request = (url: string, options: TRequestOptions): any => {
        const {
            method = METHODS.GET,
            headers = {},
            data,
            timeout = 5000,
            withCredentials = false,
        } = options;

        // Если метод GET и передана data, трансформировать data в query запрос
        const query =
            method === METHODS.GET ? queryStringify(data as TRequestData) : '';

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, this._parentPath + url + query);

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
