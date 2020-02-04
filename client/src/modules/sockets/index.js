import IO from 'socket.io-client';
import { ws } from '../realtime';

class Socket {
    constructor({ url }) {
        this.url = url;
        this.io = new IO(url);
    }
}

export default Socket;
