import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';

import Module from 'src/core/Module';
import IO from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom';
import ModuleLoader from 'ui/atoms/ModuleLoader';

class View extends Module {
    constructor({ ...params }) {
        super({ ...params });
        this.root = null;
    }

    render() {
        const RootComponent = lazy(() => {
            return new Promise(resolve => {
                setTimeout(() => resolve(import("src/core/App")), 1500);
            });
        });

        this.root = (
            <Suspense fallback={<ModuleLoader isLoading fullScreen />}>
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
