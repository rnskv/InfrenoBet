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

    async run(afterApplicationSetupCallback) {
        await afterApplicationSetupCallback(this);
        return this;
    }
}

export default Application;
