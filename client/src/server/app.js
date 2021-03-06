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
    try {
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
        // Send the rendered page back to the client
        res.send(renderFullPage(html, preloadedState, styleTags));
    } catch (err) {

    } finally {
        sheet.seal();
    }
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
            <meta name="viewport" content="width=1100px, initial-scale=0.3">
            <title>INFERNOBET - Ставки от 1 рубля!</title>
            <meta name=description content="Рулетка скинов дота 2 - место, в котором каждый может испытать свою удачу в захватывающей игре и получить уникальные предметы!">
            <meta name=keywords content="рулетка, лотерея, ставки, ставки дота2, скины дота 2, дота, быстрые скины дота 2, дабл ставки, быстрые ставки, рулетка dota2"/>
            <link rel="shortcut icon" href="/dist/resources/images/favicon.png" type="image/png">
            <link rel="canonical" href="https://infernobet.ru/"/>
            <meta name="verification" content="cf0bb3d99b3a1dba77e550d078a322" />
            <meta name="swiftpay-verification" content="bf4a552b8fef2160a0b001ca4b7f11e3" />
            <meta name="yandex-verification" content="266251ef2bca23cc" />
            <script data-ad-client="ca-pub-4020574099528906" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <!-- Yandex.Metrika counter -->
            <script type="text/javascript" >
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(66907300, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
            });
            </script>
            <noscript><div><img src="https://mc.yandex.ru/watch/66907300" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
            <!-- /Yandex.Metrika counter -->
            ${styleTags}
        </head>
        <body>
            <div id="root">
                ${html}
                <a href="//showstreams.tv/" style={{ textAlign: 'center', margin: '25px 0', display: 'block' }}>
                    <img src="//www.free-kassa.ru/img/fk_btn/17.png" title="Бесплатный видеохостинг" />
                </a>
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
    console.log(`Fronted SSR server started at ${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`);
});
