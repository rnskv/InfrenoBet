import Game from 'src/core/Game';
import crypto from 'crypto';

class Room {
    constructor(io) {
        this.gamesCount = 0;

        this.io = io;
        this.game = null;
    }

    reset() {
        this.gamesCount++;
        const secret = Math.random();
        const hash = crypto.createHash('md5').update(String(secret)).digest("hex");

        this.game = new Game({
            hash,
            secret,
            sockets: this.io.sockets,
            onFinish: this.onFinish.bind(this)
        });
    }

    onFinish() {
        this.reset();
    }
}

export default Room;
