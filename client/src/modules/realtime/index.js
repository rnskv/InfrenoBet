import Module from 'src/core/Module';
import IO from 'socket.io-client';

class Realtime extends Module {
    constructor({ events, ...params }) {
        super({ ...params });
        this.io = null;
        this.events = null;
    }

    provideApp() {
        this.events = this.events({ app: this.app });
    }

    setEvents(events) {
        this.events = events;
    }

    connect(url) {
        this.io = new IO(url);
    }
}

export default Realtime;
