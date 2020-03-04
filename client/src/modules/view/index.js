import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';

import Module from 'src/core/Module';
import IO from 'socket.io-client';

class View extends Module {
    constructor({ ...params }) {
        super({ ...params });
        this.io = null;
    }

    render() {
        const RootComponent = lazy(() => import('src/core/App'));
        ReactDOM.render(
            <Suspense fallback={<div>Loading...</div>}>
                <RootComponent
                    store={this.app.modules['store'].instanse}
                />
            </Suspense>, document.getElementById('root'));
    }
}

export default View;
