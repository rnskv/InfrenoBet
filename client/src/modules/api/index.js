import Module from 'src/core/Module';

class Api extends Module {
    constructor({ ...params }) {
        super({ ...params });
        this.services = null;
    }

    setServices(services) {
        this.services = services({ app: this.app });
    }

    setServicesToken() {
        Object.values(this.services).forEach((service) => {
            service.removeBearer();
            service.setBearerFromCookies();
        });
    }
}

export default Api;
