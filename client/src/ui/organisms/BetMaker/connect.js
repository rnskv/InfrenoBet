import { infernoClient } from 'src/index';
import * as betMakerActions from 'src/redux/betMaker/actions';

const { domains } = infernoClient.modules.store;

export function mapDispatchToProps(dispatch) {
    return {
        open: () => dispatch(betMakerActions.open()),
        close: () => dispatch(betMakerActions.close()),
        sendTransaction: ({ values }) => dispatch(domains.betMaker.sendTransaction({ values })),
        addBetInBetMaker: ({ value }) => dispatch(betMakerActions.addBetInBetMaker({ value })),
        removeBetFromBetMaker: ({ index }) => dispatch(betMakerActions.removeBetFromBetMaker({ index })),
    };
}

export function mapStateToProps(state) {
    return {
        isOpened: state.betMaker.isOpened,
        allValues: state.betMaker.allValues,
        userValues: state.betMaker.userValues,
    };
}
