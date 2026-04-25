const { JSDOM } = require('jsdom');

const register = require('@babel/register').default;

register({ extensions: ['.ts', '.js'] });

const dom = new JSDOM('<div class="app"><div>', { url: 'http://localhost' });
global.window = dom.window
global.document = dom.window.document
global.FormData = dom.window.FormData

class FakeXMLHttpRequest {
    constructor() {
        this.headers = {}
        this.status = 200
        this.response = ''
        this.withCredentials = false
        this.timeout = 0
    }

    open(method, url) {
        this.method = method
        this.url = url
    }

    setRequestHeader(key, value) {
        this.headers[key] = value
    }

    send(body) {
        if (this.method === 'GET') {
            this.response = JSON.stringify([{ postId: 1 }])
        } else {
            const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
            this.response = typeof parsedBody === 'string' ? parsedBody : JSON.stringify(parsedBody)
        }

        if (this.onload) {
            this.onload()
        }
    }
}

global.XMLHttpRequest = FakeXMLHttpRequest
