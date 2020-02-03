import { checkResponseStatus } from './ErrorsHandler';

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
        apiUrl,
        body = {},
        headers = {},
    }) {
        return new Promise((resolve, reject) => {
            const url = `${apiUrl}${this.url}`;

            const resultOptions = {
                method: this.method,
                headers: { ...headers, ...this.headers },
            };

            if (this.method !== 'get') {
                resultOptions.body = JSON.stringify({ ...body, ...this.body });
            }

            window.fetch(url, resultOptions)
                .then((response) => {
                    if (!checkResponseStatus(response.status)) {
                        return;
                    }
                    response.json().then((result) => {
                        resolve(result);
                    });
                }, (err) => {
                    alert(err);
                    reject(err);
                });
        });
    }
}
