import Room from './Room';

class Application {
    constructor() {
        this.usersSockets = {};
        this.rooms = {};
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

        if (manager[name]) {
            throw new Error(`Manager ${name} is already exist`);
        }
        this.managers[name] = manager;
        return this;
    }

    createRoom({ id }) {
        this.rooms[id] = new Room({ app: this });
        this.rooms[id].reset();
    }
}

export default Application;
