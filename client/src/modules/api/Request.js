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
                body: JSON.stringify({ ...body, ...this.body }),
                headers: { ...headers, ...this.headers },
            };


            window.fetch(url, resultOptions)
                .then((response) => {
                    response.json().then((result) => {
                        resolve(result)
                    });
                }, (err) => {
                    alert(err);
                    reject(err)
                });
        });
    }
}
