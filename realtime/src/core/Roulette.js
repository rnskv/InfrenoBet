import { getRandomIntInclusive, shuffle} from 'src/helpers/math';


class Roulette {
    constructor({ sockets, onEnd }) {
        this.sockets = sockets;
        this.onEnd = onEnd;

        this.winner = null;

        this.offset = 0;
        this.avatars = [];
        this.avatarsCount = 100;
        this.minimalRouletteOffset = 10000; //in pixels
        this.duration = 16;
        this.destination = 0;
        this.isRotate = false;
        this.isVisible = false;
        this.winnerAvatarIndex = 0;
        this.speed = 1;
        this.acceleration = 0.1;

        this.client = {
            avatar: {
                width: 80,
                height: 80
            },
            duration: this.duration * 1000,
            avatarsCount: 300
        }
    }

    get state() {
        return {
            offset: this.offset,
            avatars: this.avatars,
            isVisible: this.isVisible,
            winner: this.winner
        }
    }

    generateAvatars( { winner, bank, users }) {
        let avatars = [];
        for (const user of users) {
            const chance = bank.users[user._id] / bank.total * 100;

            for (let i = 0; i < chance * this.client.avatarsCount / 100; i++) {
                avatars.push(user.avatar);
            }
        }
        avatars = shuffle(avatars);
        avatars[this.winnerAvatarIndex] = winner.bet.user.avatar;
        this.avatars = avatars;
    }

    update() {
        this.isRotate = true;
        this.offset = this.destination;
        this.sockets.emit('game.roulette.update', this.state);
        //тут надо считать время кручения рулетки (каждую секунду)
        // Что бы потом на клиенте при обновлении страницы уменьшить transition
        // на это время
        setTimeout(() => {
            this.isRotate = false;
            this.onEnd(this.winner);
        }, this.client.duration)
    }

    setVisible(visible) {
        this.isVisible = visible;
    }

    start({ winner, bank, users }) {
        this.winner = winner;
        this.bank = bank;
        this.destination = getRandomIntInclusive(this.minimalRouletteOffset, this.client.avatarsCount * this.client.avatar.width);
        this.winnerAvatarIndex = Math.floor(this.destination / this.client.avatar.width);

        this.generateAvatars({  winner, bank, users});
        this.setVisible(true);

        this.update();
    }
}

export default Roulette;
