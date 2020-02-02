import React from 'react';
import { Provider } from "react-redux";

import { connect } from 'react-redux';

import { store } from "src/redux";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import './cssVariables.css';
import './globalStyles.css';

import Login from "ui/pages/Login";

function App({...props}) {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path={'/login'}>
                        <Login />
                    </Route>
                    <Route path="/" exact>
                        <div>Hello</div>
                    </Route>
                    <Route>
                        <div>404</div>
                    </Route>
                </Switch>
            </Router>
        </Provider>
    )
}

export default App;
