export default ({ app }) => {
    const { store } = app.modules;

    const sendTransaction = ({ values }) => async (dispatch) => {
        dispatch(app.modules.store.domains.game.transaction({ values }));
        dispatch(store.actions.betMaker.close());
    };

    return {
        sendTransaction,
    };
};
