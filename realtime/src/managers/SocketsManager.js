import Manager from 'src/core/Manager';

class SocketsManager extends Manager {
    constructor() {
        super();
        this.io = null;
        this.usersSocketsMap = {};
    }

    get totalOnline() {
        return Object.keys(this.usersSocketsMap).length
    }

    init({ handlers }) {
        super.init();
        this.handlers = handlers({ app: this.app });
    }

    connect({ socket, server }) {
        this.io = socket(server, { serveClient: false });
        this.io.on('connection', this.handlers.bind(this));
    }

    emitAllUsers({ eventName, data = {} }) {
        if (!eventName) {
            throw new Error('app.emitAllUsers property eventName is required')
        }

        this.io.sockets.emit(eventName, data);
    }

    emitUserById(id, { eventName, data = {} }) {
        if (!eventName) {
            throw new Error('app.emitUserById property eventName is required')
        }

        console.log('user sockets', this.usersSocketsMap[id]);
        if (this.usersSocketsMap[id]) {
            this.usersSocketsMap[id].forEach(socketId => {
                if (this.io.sockets.connected[socketId]) {
                    this.io.sockets.connected[socketId].emit(eventName, data);
                }
            });
        }
    }

    emit(socket, { eventName, data = {} }) {
        if (!eventName) {
            throw new Error('app.emitSocket property eventName is required')
        }

        if (socket.user) {
            console.log('emitSocket', socket.user._id, eventName, data);
            this.emitUserById(socket.user._id, { eventName, data })
        } else {
            socket.emit(eventName, data);
        }
    }

    addSocketToUserById(id, { socket }) {
        if (!id) return;
        if (!this.usersSocketsMap[id]) {
            this.usersSocketsMap[id] = [socket.id];
        } else {
            if (this.usersSocketsMap[id].includes(socket.id)) return;
            this.usersSocketsMap[id].push(socket.id);
        }
    }

    removeSocketFromUserById(id, { socket }) {
        if (!id) return;
        this.usersSocketsMap[id] = this.usersSocketsMap[id].filter((socketId) => socketId !== socket.id);
        if (this.usersSocketsMap[id].length === 0) {
            delete this.usersSocketsMap[id];
        }
    }
}

export default SocketsManager;
