class Manager {
    constructor() {
        this.app = null;
    }

    init() {
    }

    provideApp(app) {
        this.app = app;
    }
}

export default Manager;
