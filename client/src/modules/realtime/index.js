import Module from 'src/core/Module';
import IO from 'socket.io-client';

class Realtime extends Module {
    constructor({ ...params }) {
        super({ ...params });
        this.io = null;
    }

    listenEvents(events) {
        events({ app: this.app });
    }

    connect(url) {
        this.io = new IO(url);
    }
}

export default Realtime;
