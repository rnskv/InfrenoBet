class Module {
    constructor({ name }) {
        if (!name) {
            throw new Error('Module must have \'name\' property');
        }
        this.name = name;
        this.app = null;
    }

    setApplication(app) {
        this.app = app;
    }
}

export default Module;
