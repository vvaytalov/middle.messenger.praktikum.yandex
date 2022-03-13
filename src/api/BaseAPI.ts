export default abstract class BaseApi {
    static defaultHeaders = {
        'Content-type': 'application/json; charset=UTF-8',
    };

    create() {
        throw new Error('Not implemented');
    }
    request() {
        throw new Error('Not implemented');
    }
    update() {
        throw new Error('Not implemented');
    }
    delete() {
        throw new Error('Not implemented');
    }
}
