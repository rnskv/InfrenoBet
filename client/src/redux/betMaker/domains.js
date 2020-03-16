export default ({ app }) => {
    const { store } = app.modules;
    const { domains, actions } = store;

    const getItems = () => async (dispatch) => {
        const items = await app.modules.api.services.items.execute('getAll');
        dispatch(actions.betMaker.addItems({ items }));
    };

    const sendBet = ({ items }) => async (dispatch) => {
        dispatch(domains.game.addBet({ items }));
        dispatch(actions.betMaker.close());
    };

    return {
        sendBet,
        getItems,
    };
};
