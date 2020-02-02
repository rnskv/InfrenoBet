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

    execute(requestName, params) {
        this.requests[requestName]
            .execute({
                ...params,
                headers: { ...this.headers, ...params.headers },
            });
    }
}
