class Api {
    constructor({ rp, API_URL }) {
        this.rp = rp;
        this.API_URL = API_URL;
        this.token = null;
    }

    async logIn({ email, password }) {
        await this.sendRequest({
            url: '/api/auth/login',
            method: 'post',
            body: {
                email,
                password,
            },
            onSuccess: ({ token }) => {
                console.log('Авторизация DEAMONS сервера INFERNO завершена. Токен получен');
                this.token = token;
            },
            onError: (err) => {
                console.log('При авторизации DEAMONS сервера INFERNO произошла ошибка. Повторяем попытку...');
                setTimeout(this.logIn.bind(this), 5000)
            }
        })
    }

    async sendRequest({ url, body, method = 'get', onSuccess, onError }) {
        try {
            const response = await this.rp({
                uri: `${this.API_URL}${url}`,
                method: method,
                body: body,
                json: true,
                headers: {
                    'Authorization': this.token
                }
            });

            onSuccess(response);
            return response;
        } catch (err) {
            onError(err);
            return null;
        }
    }
}

module.exports = Api;
