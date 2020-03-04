import Module from 'src/core/Module';
import services from 'src/services/api';

class Api extends Module {
    constructor({ ...params }) {
        super({ ...params });
        this.services = Object.keys(services).map(name => services[name]({ app: this.app }));
    }
}

export default Api;
