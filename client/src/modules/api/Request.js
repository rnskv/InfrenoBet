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

            console.log(resultOptions);
            window.fetch(url, resultOptions)
                .then((response) => {
                    console.log(response);
                    switch (response.status) {
                    case 401: {
                        alert('Unauth');
                        return;
                    }

                    case 500: {
                        alert('INERVAL HACK GO GO GO ERROR');
                        return;
                    }

                    case 400: {
                        break;
                    }

                    case 200: {
                        console.log('Good request');
                        break;
                    }

                    default: {
                        alert('Unhandler error');
                        return;
                    }
                    }

                    response.json().then((result) => {
                        console.log('Bearer', result);
                        resolve(result);
                    });
                }, (err) => {
                    alert(err);
                    reject(err);
                });
        });
    }
}
