import fetcher from 'node-fetch';
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
        onError = null
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

            fetcher(url, resultOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw response;
                    }
                    return response.json();
                })
                .then(json => {
                    resolve(json)
                })
                .catch(err => {
                    err.json().then(notification => {
                        console.log(notification)
                        reject(notification)
                    });
                });
        });
    }
}
