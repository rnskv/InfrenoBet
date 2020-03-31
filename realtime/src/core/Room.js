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

    async startListening() {
        while (this) {
            await new Promise((resolve) => { setTimeout(resolve, 1000) });

            if (!this.game) continue;

            if (this.game.roulette.isVisible) {
                console.log('Перенарпавляем ставки в следующую игру');
                continue;
            }

            this.app.managers.redis.lpop('game.roulette.bets', async (err, response) => {
                if (err) {
                    return;
                }
                try {
                    console.log(response);
                    const bet = JSON.parse(response);
                    if (!bet) return;

                    await this.game.addBet(bet)
                } catch(e) {
                    console.log('При принятии ставки произошла ошибка', e)
                }
            });
        }
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
