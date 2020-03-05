export default ({ app }) => {
    const { api, store, realtime } = app.modules;
    const { actions, domains } = store;

    api.services.user.setBearerFromLocalStorage();

    if (store.getState().user.token) {
        realtime.io.emit('project.logIn', store.getState().user.token);
    }

    const getProfile = () => async (dispatch) => {
        // @todo вынести в геттер апи isAut или что то такое
        if (!api.services.user.headers.Authorization) {
            return;
        }

        const { profile } = await api.services.user.execute('getProfile');

        dispatch(actions.user.setProfile({ profile }));
    };


    const logUp = ({ email, name, password }) => async (dispatch) => {
        dispatch(actions.user.loading());

        const response = await api.services.auth.execute('logUp', {
            body: {
                email,
                password,
                name,
            },
        });

        if (response.ok) {
            dispatch(actions.user.register());
        } else {
            dispatch(actions.user.error({ logupError: response.error }));
        }
    };

    const logIn = ({ email, password }) => async (dispatch) => {
        dispatch(actions.user.loading());

        const response = await api.services.auth.execute('logIn', {
            body: {
                email,
                password,
            },
        });

        if (response.token) {
            window.localStorage.setItem('token', response.token);
            dispatch(actions.user.logIn({ token: response.token }));
            realtime.io.emit('project.logIn', response.token);
            api.services.user.setHeader('Authorization', response.token);
            dispatch(getProfile());
        } else {
            dispatch(actions.error({ loginError: response.error }));
        }
    };

    const logOut = () => (dispatch) => {
        window.localStorage.removeItem('token');
        api.services.user.setHeader('Authorization', null);
        dispatch(actions.user.logOut());
        realtime.io.emit('project.logOut');
    };

    return {
        getProfile,
        logOut,
        logUp,
        logIn,
    };
};
