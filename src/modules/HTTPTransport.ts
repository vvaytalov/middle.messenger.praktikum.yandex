const METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
};

function queryStringify(data: Object) {
    if (typeof data !== "object") {
        throw new Error("Not object");
    }

    return Object.entries(data).reduce(
        (acc, [key, val], i) => `${acc}${i === 0 ? "?" : "&"}${key}=${val}`,
        ""
    );
}

interface IOptions {
    data: string;
    headers: {
        [key: number]: unknown;
    };
    method: string;
    timeout: number;
}

export default class HTTPTransport {
    get = (url: string, options: IOptions) => {
        return this.request(
            url,
            { ...options, method: METHODS.GET },
            options.timeout
        );
    };

    post = (url: string, options: IOptions) => {
        return this.request(
            url,
            { ...options, method: METHODS.POST },
            options.timeout
        );
    };

    put = (url: string, options: IOptions) => {
        return this.request(
            url,
            { ...options, method: METHODS.PUT },
            options.timeout
        );
    };

    delete = (url: string, options: IOptions) => {
        return this.request(
            url,
            { ...options, method: METHODS.DELETE },
            options.timeout
        );
    };

    request = (url: string, options: IOptions, timeout?: number) => {
        const { headers = {}, method, data } = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject("No method");
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data ? `${url}${queryStringify(data)}` : url
            );

            Object.keys(headers).forEach((key) =>
                xhr.setRequestHeader(key, headers[key])
            );

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
