import 'babel-polyfill';
import React from 'react';
import history from 'src/modules/router/history';

import { Provider } from 'react-redux';

import { store } from 'src/redux';
import { ws } from 'src/modules/realtime';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import './cssVariables.css';
import './globalStyles.css';

import Login from 'ui/pages/Login';
import Logup from 'ui/pages/Logup';

import Main from 'ui/pages/Main';
import 'src/redux/realtime';

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/logup">
                        <Logup />
                    </Route>
                    <Route path="/" exact>
                        <Main />
                    </Route>
                    <Route>
                        <div>404</div>
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
