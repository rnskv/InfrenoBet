class Manager {
    constructor() {
        this.app = null;
    }

    provideApp(app) {
        this.app = app;
    }
}

export default Manager;
