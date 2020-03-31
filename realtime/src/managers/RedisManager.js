import redis from 'redis';
import { promisify } from "util";
import Manager from 'src/core/Manager';

class RedisManager extends Manager{
    constructor({ client }) {
        super();
        this.client = client;

        this.client.on("error", this.onError.bind(this));
        console.log('Я родился')
    }

    onError() {
        console.error(error);
    }

    get(key, cb) {
        this.client.get(key, cb || redis.print)
    }

    set(key, value, cb) {
        return this.client.set(key, value, cb || redis.print)
    }

    rpush(list, value, cb) {
        return this.client.rpush(list, value, cb || redis.print)
    }

    rpop(list, cb) {
        return this.client.rpop(list, cb || redis.print)
    }

    lpop(list, cb) {
        return this.client.lpop(list, cb || redis.print)
    }
}

export default RedisManager;
