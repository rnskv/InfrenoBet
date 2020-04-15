import Cookies from 'js-cookie';

Cookies.set('Author', 'rnskv');

export default class Api {
    constructor({
        url = '/',
        headers = {},
        body = {},
        credentials = 'same-origin',
        onError = null
    }) {
        this.url = url;
        this.headers = headers;
        this.body = body;
        this.requests = {};
        this.onError = onError;
        this.credentials = credentials;
    }

    setHeader(headerName, value) {
        this.headers[headerName] = value;
    }

    setBearer(token) {
        this.setHeader('Authorization', token);
    }

    removeBearer() {
        this.setHeader('Authorization', null);
    }

    setBearerFromCookies() {
        this.setHeader('Authorization', Cookies.get('token'));
    }

    addRequests(requests) {
        this.requests = requests;
    }

    execute(requestName, {
        headers,
        body,
        onError,
    } = {}) {
        if (!this.requests[requestName]) {
            throw new Error(`Request ${requestName} isn't defined`);
        }

        return this.requests[requestName]
            .execute({
                apiUrl: this.url,
                headers: { ...this.headers, ...headers },
                body: { ...this.body, ...body },
                credentials: this.credentials,
                onError: onError || this.onError
            });
    }
}
