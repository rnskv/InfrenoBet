import path from 'path';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import reducers from 'src/redux/reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from 'src/core/App';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

// import { createMemoryHistory } from 'history';
const { CLIENT_PORT } = process.env;

const app = Express();
const port = CLIENT_PORT;

// Serve static files
app.use('/dist', Express.static('dist'));

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
    /* ... */
    // Create a new Redux store instance
    const sheet = new ServerStyleSheet();
    const store = createStore(
        combineReducers(reducers),
        applyMiddleware(thunk),
    );

    // Render the component to a string
    const context = {};
    const html = renderToString(
        <StyleSheetManager sheet={sheet.instance}>
            <StaticRouter location={req.url} context={context}>
                <App store={store} />
            </StaticRouter>
        </StyleSheetManager>,
    );

    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    const styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
    sheet.seal();
    // Send the rendered page back to the client
    res.send(renderFullPage(html, preloadedState, styleTags));
}
function renderFullPage(html, preloadedState, styleTags) {
    return `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport"
                  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            ${styleTags}
        </head>
        <body>
            <div id="root">
                ${html}
            </div>
            <script>
                  // WARNING: See the following for security issues around embedding JSON in HTML:
                  // https://redux.js.org/recipes/server-rendering/#security-considerations
                 window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c',
    )}
            </script>
            <script src="/dist/inferno-client.js"></script>
        </body>
        </html>
    `;
}

app.listen(port, process.env.CLIENT_HOST, () => {
    console.log('Server started at port', port, app);
});
