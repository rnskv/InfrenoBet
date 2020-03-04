import * as actionTypes from './actionsTypes';
import { realtime } from '../../index';

const getClearGameState = () => ({
    transactions: [],
    users: [],
    bank: {
        users: {},
        total: 0,
    },
    time: 0,
    hash: '',
    secret: '',
    isWaitingTransactions: false,
    transactionsPoolLength: 0,
    userDepositsCount: 0,
    isShowWinner: false,
    roulette: {
        offset: 0,
        avatars: [],
        isVisible: false,
        winner: {},
    },
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

    case actionTypes.GAME_TRANSACTIONS: {
        console.log('GAME_TRANSACTION');
        const { transactions, bank, users } = action.payload;
        return {
            ...state,
            bank,
            users,
            transactions: [ ...transactions, ...state.transactions],
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
            secret: action.payload.secret,
            isShowWinner: true,
            isWaitingTransactions: false,
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
        return {
            ...state,
            isWaitingTransactions: true,
            transactionsPoolLength: action.payload.transactionsPoolLength,
        };
    }

    case actionTypes.GAME_START_ROULETTE: {
        return {
            ...state,
            isShowRoulette: true,
        };
    }

    case actionTypes.GAME_UPDATE_ROULETTE: {
        return {
            ...state,
            roulette: action.payload.state,
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
