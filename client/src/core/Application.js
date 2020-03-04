class Application {
    constructor({ config, RootComponent }) {
        this.modules = {};
        this.config = config;
        this.RootComponent = RootComponent;
    }

    use(module) {
        console.log(module)
        this.modules[module.name] = module;
        module.setApplication(this);

        return this;
    }

    run() {
        console.log(this.modules)
    }
}

export default Application;
