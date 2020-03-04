class Application {
    constructor({ config, RootComponent }) {
        this.modules = {};
        this.config = config;
        this.RootComponent = RootComponent;
    }

    use(module) {
        this.modules[module.name] = module;
        module.setApplication(this);

        return this;
    }

    run() {
        console.log('Application was started');
    }
}

export default Application;
