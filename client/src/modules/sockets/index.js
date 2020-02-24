import IO from 'socket.io-client';
import { ws } from '../realtime';

class Socket {
    constructor({ url }) {
        this.url = url;
        this.connect();
    }

    connect() {
        this.io = new IO(this.url);
    }
}

export default Socket;
