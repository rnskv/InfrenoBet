export default class Api {
    constructor({
        url = '/',
        headers = {},
        body = {},
        onError = null
    }) {
        this.url = url;
        this.headers = headers;
        this.body = body;
        this.requests = {};
        this.onError = onError;
    }

    setHeader(headerName, value) {
        this.headers[headerName] = value;
    }

    setBearer(token) {
        this.setHeader('Authorization', globalThis.localStorage.getItem('token'));
    }

    setBearerFromLocalStorage() {
        this.setHeader('Authorization', globalThis.localStorage.getItem('token'));
    }

    addRequests(requests) {
        this.requests = requests;
    }

    execute(requestName, {
        headers,
        body,
        onError
    } = {}) {
        return this.requests[requestName]
            .execute({
                apiUrl: this.url,
                headers: { ...this.headers, ...headers },
                body: { ...this.body, ...body },
                onError: onError || this.onError
            });
    }
}
