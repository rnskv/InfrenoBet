import IO from 'socket.io-client';

class Socket {
    constructor({ url }) {
        this.url = url;
        this.io = new IO(url);
    }
}

export default Socket;
