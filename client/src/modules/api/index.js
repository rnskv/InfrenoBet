import Module from 'src/core/Module';

class Api extends Module {
    constructor({ ...params }) {
        super({ ...params });
        this.services = null;
    }

    connect({ services }) {
        this.services = services({ app: this.app });
    }
}

export default Api;
