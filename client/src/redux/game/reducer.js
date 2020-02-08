import * as actionTypes from './actionsTypes';

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}


const getClearGameState = () => ({
    transactions: [],
    users: [],
    bank: {
        users: {},
        total: 0,
    },
    time: 0,
    hash: '',
    winner: {},
    secret: '',
    isWaitingTransactions: false,
    isRouletteStart: false,
    isShowWinner: false,
    transactionsPoolLength: 0,
    userDepositsCount: 0,
    avatars: [],
});

const initialState = {
    token: window.localStorage.getItem('token') || '',
    ...getClearGameState(),
};

function gameReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.GAME_JOIN: {
        console.log('GAME_JOIN', action.payload.userData);
        return {
            ...state,
            users: [...state.users, action.payload.userData],
        };
    }

    case actionTypes.GAME_TRANSACTION: {
        console.log('GAME_TRANSACTION');
        const { transaction, bank, users } = action.payload;
        return {
            ...state,
            bank,
            users,
            transactions: [transaction, ...state.transactions],
        };
    }

    case actionTypes.GAME_START: {
        console.log('GAME_START');
        return {
            ...state,
            time: action.payload.time,
        };
    }

    case actionTypes.GAME_TICK: {
        console.log('GAME_TICK');
        return {
            ...state,
            time: action.payload.time,
        };
    }

    case actionTypes.GAME_GET_WINNER: {
        console.log('GAME_GET_WINNER', state.users, state.bank);
        return {
            ...state,
            winner: action.payload.winner,
            secret: action.payload.secret,
            isShowWinner: true,
        };
    }

    case actionTypes.GAME_RESET: {
        console.log('GAME_RESET');

        return {
            ...state,
            ...getClearGameState(),
            ...action.payload.state,
        };
    }

    case actionTypes.GAME_SYNC: {
        console.log('GAME_SYNC');
        return {
            ...state,
            ...action.payload.state,
        };
    }

    case actionTypes.GAME_WAITING_TRANSACTIONS: {
        console.log(action.payload);
        return {
            ...state,
            isWaitingTransactions: true,
            transactionsPoolLength: action.payload.transactionsPoolLength,
        };
    }

    case actionTypes.GAME_START_ROULETTE: {
        let avatars = [];
        for (const user of state.users) {
            const chance = state.bank.users[user._id] / state.bank.total * 100;

            for (let i = 0; i < chance * 3; i++) {
                avatars.push(user.avatar);
            }
        }
        avatars = shuffle(avatars);

        avatars[283] = 'https://sun1-14.userapi.com/vDkj8XeqCNIRZEgeBgQqx2j76ksxZurzz6f-wg/hD5zXQcN1R4.jpg?ava=1';

        return {
            ...state,
            isRouletteStart: true,
            avatars,
        };
    }

    case actionTypes.GAME_TRANSACTION_ACCEPTED: {
        return {
            ...state,
            userDepositsCount: state.userDepositsCount - 1,
        };
    }

    case actionTypes.GAME_TRANSACTION_SENDED: {
        return {
            ...state,
            userDepositsCount: state.userDepositsCount + 1,
        };
    }

    default: {
        return {
            ...state,
        };
    }
    }
}

export default gameReducer;
