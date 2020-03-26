import Manager from 'src/core/Manager';
import Room from '../core/Room';

class RoomsManager extends Manager{
    constructor() {
        super();
        this.rooms = {};
    }

    create(name) {
        this.rooms[name] = new Room({ app: this.app });
        this.rooms[name].reset();
    }

    get(name) {
        return this.rooms[name]
    }
}

export default RoomsManager;
