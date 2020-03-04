class Application {
    constructor({ config }) {
        this.modules = {};
        this.config = config;
    }

    use(module) {
        this.modules[module.name] = module;
        module.setApplication(this);

        return this;
    }

    run() {
        console.log('Application was started', this);
    }
}

export default Application;
