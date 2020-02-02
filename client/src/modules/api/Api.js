export default class Api {
    constructor({
        url,
        headers,
    }) {
        this.url = url;
        this.headers = headers;
        this.requests = {};
    }

    // setHeader() {
    //
    // }
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
    }) {
        return this.requests[requestName]
            .execute({
                apiUrl: this.url,
                headers: { ...this.headers, ...headers },
                body: { ...this.body, ...body },
            });
    }
}
