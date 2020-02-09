import { getRandomIntInclusive, shuffle} from 'src/helpers/math';


class Roulette {
    constructor({ sockets, onEnd }) {
        this.sockets = sockets;
        this.onEnd = onEnd;

        this.winner = {};

        this.offset = 0;
        this.avatars = [];
        this.avatarsCount = 100;
        this.duration = 10;
        this.destination = 0;
        this.isRotate = false;
        this.isVisible = false;
        this.isShowWinner = false;
        this.winnerAvatarIndex = 0;
        this.speed = 1;
        this.acceleration = 0.1;
    }

    get state() {
        return {
            offset: this.offset,
            avatars: this.avatars,
            isVisible: this.isVisible,
            winner: this.winner,
            isShowWinner: this.isShowWinner
        }
    }

    generateAvatars( { winner, bank, users }) {
        let avatars = [];
        for (const user of users) {
            const chance = bank.users[user._id] / bank.total * 100;

            for (let i = 0; i < chance * 3; i++) {
                avatars.push(user.avatar);
            }
        }
        avatars = shuffle(avatars);

        avatars[this.winnerAvatarIndex] = 'https://sun1-14.userapi.com/vDkj8XeqCNIRZEgeBgQqx2j76ksxZurzz6f-wg/hD5zXQcN1R4.jpg?ava=1';
        this.avatars = avatars;
    }

    update() {
        if ((this.destination - this.offset) / 10000 * 30 > 0.5) {
            this.speed = (this.destination - this.offset) / 10000 * 30;
        } else {
            this.speed = 0.5;
        }




        if (this.offset < this.destination) {
            this.offset += this.speed;
        } else {
            this.offset = this.destination;
            this.isRotate = false;
            this.isShowWinner = true;
            this.onEnd(this.winner);
        }

        this.sockets.emit('game.roulette.update', this.state);

        if (this.isRotate) {
            setTimeout(this.update.bind(this), 1000 / 60);
        }
    }

    setVisible(visible) {
        this.isVisible = visible;
    }

    start({ winner, bank, users }) {
        this.destination = getRandomIntInclusive(0, 24930);

        this.winnerAvatarIndex = Math.floor(this.destination / 80);

        this.generateAvatars({  winner, bank, users});
        this.setVisible(true);
        this.isRotate = true;
        this.winner = winner;
        this.bank = bank;

        this.update();
    }
}

export default Roulette;
