import Game from 'src/core/Game';
import crypto from 'crypto';

class Room {
    constructor({ app }) {
        this.gamesCount = 0;
        this.app = app;
        this.game = null;

        this.startListening().then(() => {
            console.log('Слушал ставки')
        });
    }

    async loop() {
        try {
            if (!this.game) {
                throw new Error(`Game isn't exist`);
            }

            if (this.game.roulette.isVisible || this.game.isClosedForBets) {
                throw new Error('Redirect bets to next game');
            }

            this.app.managers.redis.lpop('game.roulette.bets', async (err, response) => {
                if (err) {
                    throw err;
                }

                const bet = JSON.parse(response);

                if (!bet) {
                    console.log('Ставка не найдена');
                    setTimeout(this.loop.bind(this), 1000);
                } else {
                    console.log('Зашел в ставку');
                    await this.game.addBet(bet);
                    this.loop()
                }

            });
        } catch (e) {
            setTimeout(this.loop.bind(this), 1000);
        }

    };
    async startListening() {
        await this.loop();
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

    onFinish() {
        this.reset();
    }
}

export default Room;
