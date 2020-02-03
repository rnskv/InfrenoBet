export default class Api {
    constructor({
        url = '/',
        headers = {},
        body = {},
    }) {
        this.url = url;
        this.headers = headers;
        this.body = body;
        this.requests = {};
    }

    setHeader(headerName, value) {
        this.headers[headerName] = value;
    }

    setBearerFromLocalStorage() {
        this.setHeader('Authorization', window.localStorage.getItem('token'));
    }
    //
    // removeHeader() {
    //
    // }

    addRequests(requests) {
        this.requests = requests;
    }

    execute(requestName, {
        headers,
        body,
    } = {}) {
        return this.requests[requestName]
            .execute({
                apiUrl: this.url,
                headers: { ...this.headers, ...headers },
                body: { ...this.body, ...body },
            });
    }
}
