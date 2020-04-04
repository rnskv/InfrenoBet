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
        this.isLoading = true;
    }

    execute({
        apiUrl,
        body = {},
        headers = {},
        onError = null,
        useCache = true
    }) {
        if (useCache && this.promise) return this.promise;

        this.promise = new Promise((resolve, reject) => {
            const url = `${apiUrl}${this.url}`;

            const resultOptions = {
                method: this.method,
                headers: { ...headers, ...this.headers },
            };

            if (this.method !== 'get') {
                resultOptions.body = JSON.stringify({ ...body, ...this.body });
            }

            fetcher(url, resultOptions)
                .then(async (response) => {
                    return response.json();
                })
                .then(json => {

                    if (json.isError) {
                        if (onError) {
                            onError({ type: json.type });
                        }
                        this.promise = null;
                        reject(json);
                        return;
                    }
                    this.promise = null;
                    resolve(json)
                })
                .catch(err => {
                    if (typeof err.json !== 'function') {
                        if (onError) {
                            onError({ type: 'INTERNAL_SERVER_ERROR' });
                        }
                        this.promise = null;
                        reject(err);
                        return;
                    }

                    err.json()
                        .then(notification => {
                            if (onError) {
                                console.log(`I'am really want call onError callback, but you not pass it to me :( You error is`, notification)
                                onError(notification);
                            }
                            this.promise = null;
                            reject(notification)
                        })
                        .catch(err => {
                            console.error(`Api can't parse json object in answer from server`, err)
                        });
                })
                .finally(() => {
                    this.promise = null;
                });
        });

        return this.promise;
    }
}
