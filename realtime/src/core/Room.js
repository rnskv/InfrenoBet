import Game from 'src/core/Game';
import crypto from 'crypto';

class Room {
    constructor({ app }) {
        this.gamesCount = 0;
        this.app = app;
        this.game = null;
    }

    reset({ betsQueue } = { betsQueue: [] }) {
        this.gamesCount++;
        const secret = Math.random();
        const hash = crypto.createHash('md5').update(String(secret)).digest("hex");

        console.log('reset game', betsQueue);

        this.game = new Game({
            hash,
            secret,
            betsQueue,
            app: this.app,
            onFinish: this.onFinish.bind(this)
        });
    }

    onFinish({ betsQueue }) {
        this.reset({ betsQueue });
    }
}

export default Room;
