import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import './globalStyles.css';

import Login from "ui/pages/Login";

function App({...props}) {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default App;
