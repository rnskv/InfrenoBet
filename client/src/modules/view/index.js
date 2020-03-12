import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';

import Module from 'src/core/Module';
import IO from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

class View extends Module {
    constructor({ ...params }) {
        super({ ...params });
        this.root = null;
    }

    render() {
        const RootComponent = lazy(() => import('src/core/App'));

        this.root = (
            <Suspense fallback={<div>Loading...</div>}>
                <BrowserRouter>
                    <RootComponent store={this.app.modules['store'].instanse}
                />
                </BrowserRouter>
            </Suspense>
        );

        ReactDOM.hydrate(
            this.root, globalThis.document.getElementById('root')
        );
    }
}

export default View;
