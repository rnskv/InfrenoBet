export default ({ app }) => {
    const { store } = app.modules;
    const { domains, actions } = store;
    const sendTransaction = ({ values }) => async (dispatch) => {
        dispatch(domains.game.transaction({ values }));
        dispatch(actions.betMaker.close());
    };

    return {
        sendTransaction,
    };
};
