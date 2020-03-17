import * as actionTypes from './actionsTypes';

const getClearGameState = () => ({
    bets: [],
    users: [],
    bank: {
        users: {},
        total: 0,
    },
    time: 0,
    hash: '',
    secret: 0,
    isWaitingLastBets: false,
    betsQueueLength: 0,
    userDepositsCount: 0,
    isShowWinner: false,
    roulette: {
        offset: 0,
        avatars: [],
        isVisible: false,
        winner: null,
    },
});

const initialState = {
    ...getClearGameState(),
};

function gameReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.GAME_JOIN: {
        return {
            ...state,
            users: [...state.users, action.payload.userData],
        };
    }

    case actionTypes.GAME_ADD_BETS: {
        const { bets, bank, users } = action.payload;
        return {
            ...state,
            bank,
            users,
            bets: [...bets, ...state.bets],
        };
    }

    case actionTypes.GAME_START: {
        return {
            ...state,
            time: action.payload.time,
        };
    }

    case actionTypes.GAME_TICK: {
        return {
            ...state,
            time: action.payload.time,
        };
    }

    case actionTypes.GAME_GET_WINNER: {
        return {
            ...state,
            secret: action.payload.secret,
            isShowWinner: true,
            isWaitingLastBets: false,
        };
    }

    case actionTypes.GAME_RESET: {
        return {
            ...state,
            ...getClearGameState(),
            ...action.payload.state,
        };
    }

    case actionTypes.GAME_SYNC: {
        return {
            ...state,
            ...action.payload.state,
        };
    }

    case actionTypes.GAME_WAITING_LAST_BETS: {
        return {
            ...state,
            isWaitingLastBets: true,
            betsQueueLength: action.payload.betsQueueLength,
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

    case actionTypes.GAME_BET_ACCEPTED: {
        return {
            ...state,
            userDepositsCount: state.userDepositsCount - 1,
        };
    }

    case actionTypes.GAME_BET_SENDED: {
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
