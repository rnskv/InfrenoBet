import Game from 'src/core/Game';
import crypto from 'crypto';

class Room {
    constructor({ app }) {
        this.gamesCount = 0;
        this.app = app;
        this.game = null;
    }

    reset() {
        this.gamesCount++;
        const secret = Math.random();
        const hash = crypto.createHash('md5').update(String(secret)).digest("hex");

        this.game = new Game({
            hash,
            secret,
            app: this.app,
            onFinish: this.onFinish.bind(this)
        });
    }

    onFinish() {
        this.reset();
    }
}

export default Room;
