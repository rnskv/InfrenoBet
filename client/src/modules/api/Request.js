export default class Request {
    constructor({
        url = '/',
        method = 'GET',
        body = {},
        headers = {},
    }) {
        this.url = url;
        this.method = method;
        this.body = body;
        this.headers = headers;
    }

    execute({
        body = {},
        headers = {},
    }) {
        const resultParams = {
            body: { ...body, ...this.body },
            headers: { ...headers, ...this.headers },
        };

        console.log('execute', resultParams);
    }
}
