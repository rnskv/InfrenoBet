import { infernoClient } from 'src/index';
import * as betMakerActions from 'src/redux/betMaker/actions';

const { domains } = infernoClient.modules.store;

export function mapDispatchToProps(dispatch) {
    return {
        open: () => dispatch(betMakerActions.open()),
        close: () => dispatch(betMakerActions.close()),
        sendBet: ({ items }) => dispatch(domains.betMaker.sendBet({ items })),
        addItemInBetMaker: ({ item }) => dispatch(betMakerActions.addItemInBetMaker({ item })),
        removeItemFromBetMaker: ({ index }) => dispatch(betMakerActions.removeItemFromBetMaker({ index })),
    };
}

export function mapStateToProps(state) {
    return {
        isOpened: state.betMaker.isOpened,
        userItems: state.betMaker.userItems,
        items: state.betMaker.items,
    };
}
