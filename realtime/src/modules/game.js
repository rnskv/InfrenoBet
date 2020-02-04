class Game {
    constructor({ sockets, onFinish }) {
        this.sockets = sockets;
        this.hash = '';
        this.users = [];
        this.transactions = [];
        this.time = 10;
        this.isStarted = false;
        this.isFinished = false;

        this.onFinish = onFinish;
    }

    get state() {
        return {
            users: this.users,
            transactions: this.transactions,
            hash: this.hash,
            time: this.time
        }
    }

    start() {
        console.log('start');
        this.isStarted = true;
        this.tick();

        this.sockets.emit('game.start');
    }

    tick() {
        console.log('tick', this.time);

        this.time -= 1;
        this.sockets.emit('game.tick', this.time);

        if (this.time >= 0) {
            setTimeout(this.tick.bind(this), 1000)
        } else {
            this.getWinner();
            setTimeout(this.onFinish, 2000);
        }
    }

    getWinner() {
        const winner = this.users[0]; // 1-st user win!;
        this.sockets.emit('game.getWinner', winner);
        console.log('getWinner', winner);
    }

    join(userData) {
        console.log('join', userData);

        this.users.push(userData);
        this.sockets.emit('game.join', userData);

        if (this.users.length >= 2 && !this.isStarted) {
            this.start();
        }
    }

    transaction(transactionData) {
        console.log('transaction', transactionData);

        this.transactions.push(transactionData);
        this.sockets.emit('game.transaction', transactionData);
    }
}

export default Game;
