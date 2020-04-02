class Api {
    constructor({ rp, API_URL }) {
        this.rp = rp;
        this.API_URL = API_URL;
    }

    async sendRequest({ url, body, method = 'get', onSuccess, onError }) {
        try {
            const tradeRequests = await this.rp({
                uri: `${this.API_URL}${url}`,
                method: method,
                body: body,
                json: true
            });

            onSuccess(tradeRequests);
            return tradeRequests;
        } catch (err) {
            onError(err);
            return null;
        }
    }
}

module.exports = Api;
