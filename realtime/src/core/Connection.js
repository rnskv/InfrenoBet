const socket = require('socket.io');

class Connection {
    constructor(server) {
        this.io = socket(server, { serveClient: false });
    }
}

export default Connection;
