import Manager from 'src/core/Manager';

class SocketsManager extends Manager{
    constructor() {
        super();
        this.io = null;
        this.usersSocketsMap = {};
    }

    setIO(io) {
        this.io = io;
    }

    emitAllUsers({ eventName, params = {} }) {
        if (!eventName) {
            throw new Error('app.emitAllUsers property eventName is required')
        }

        this.io.sockets.emit(eventName, params);
    }

    emitUserById(id, { eventName, params = {} }) {
        if (!eventName) {
            throw new Error('app.emitUserById property eventName is required')
        }

        if (this.usersSocketsMap[id]) {
            this.usersSocketsMap[id].forEach(socketId => {
                if (this.io.sockets.connected[socketId]) {
                    this.io.sockets.connected[socketId].emit(eventName, params);
                }
            });
        }
    }

    emitSocket(socket, { eventName, params = {} }) {
        if (!eventName) {
            throw new Error('app.emitSocket property eventName is required')
        }

        if (socket.user) {
            console.log('emitSocket', socket.user._id, eventName, params);

            this.emitUserById(socket.user._id, { eventName, params })
        } else {
            socket.emit(eventName, params);
        }
    }

    addSocketToUserById(id, { socket }) {
        if (!id) return;
        if (!this.usersSocketsMap[id]) {
            this.usersSocketsMap[id] = [socket.id]
        } else {
            this.usersSocketsMap[id].push(socket.id);
        }
    }

    removeSocketFromUserById(id, { socket }) {
        if (!id) return;
        this.usersSocketsMap[id] = this.usersSocketsMap[id].filter((socketId) => socketId !== socket.id);
    }
}

export default SocketsManager;
