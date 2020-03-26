import Room from './Room';

class Application {
    constructor() {
        this.usersSockets = {};
        this.managers = {};
    }

    init() {
        this.provideAppToManagers();
    }


    provideAppToManagers() {
        Object.values(this.managers).forEach(manager => {
            manager.provideApp(this);
        })
    }

    addManager(name, manager) {
        if (!name) {
            throw new Error(`Property 'name' is required for manager`);
        }

        if (this.managers[name]) {
            throw new Error(`Manager ${name} is already exist`);
        }

        this.managers[name] = manager;
        return this;
    }
}

export default Application;
