import Room from './Room';
import { authApi } from 'src/modules/api';
import * as API from 'src/modules/api';

class Application {
    constructor() {
        this.usersSockets = {};
        this.managers = {};
        this.plugins = {};
    }

    init(afterInitCallback) {
        console.log('Init start. After init:', afterInitCallback);

        return new Promise((resolve, reject) => {
            this.provideAppToManagers();

            authApi.execute('logIn', {
                body: {
                    email: process.env.INFERNO_EMAIL,
                    password: process.env.INFERNO_PASSWORD,
                },
            }).then(({ token }) => {
                console.log('Авторизация IO сервера INFERNO завершена. Токен получен');

                Object.values(API).forEach(api => {
                    api.setBearer(token);
                });

                afterInitCallback(this);
                resolve(this);
            }).catch((err) => {
                console.log('Не удалось авторизироваться');
                setTimeout(this.init.bind(this), 5000);
                reject(err);
            });
        })
    }


    provideAppToManagers() {
        Object.values(this.managers).forEach(manager => {
            manager.provideApp(this);
        })
    }

    addPlugin(name, plugin) {
        this.plugins[name] = plugin({ app: this });
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
