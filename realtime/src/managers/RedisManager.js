import redis from 'redis';
import { promisify } from "util";
import Manager from 'src/core/Manager';

class RedisManager extends Manager{
    constructor({ client, pub, sub }) {
        super();
        this.client = client;
        this.pub = pub;
        this.sub = sub;

        this.pub.auth('kjashdhqe!i321lDdasd');
        this.sub.auth('kjashdhqe!i321lDdasd');
        this.client.auth('kjashdhqe!i321lDdasd');


        this.client.on("error", this.onError.bind(this));
        this.pub.on("error", this.onError.bind(this));
        this.sub.on("error", this.onError.bind(this));

        console.log('Я родился')
    }

    logger(data) {

    }

    onError() {
        console.error(error);
    }

    get(key, cb) {
        this.client.get(key, cb)
    }

    set(key, value, cb) {
        return this.client.set(key, value, cb)
    }

    rpush(list, value, cb) {
        return this.client.rpush(list, value, cb)
    }

    rpop(list, cb) {
        return this.client.rpop(list, cb)
    }

    lpop(list, cb) {
        return this.client.lpop(list, cb)
    }

    on(eventName, cb) {
        this.sub.on(eventName, cb);
    }

    subscribe(channelName) {
        this.sub.subscribe(channelName)
    }

    publish(channelName, data, cb) {
        this.pub.publish(channelName, data, cb)
    }
}

export default RedisManager;
