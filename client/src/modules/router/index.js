import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import routes from './routes';

export default function configureRouter() {
    return createRouter(routes, {
        defaultRoute: 'inbox',
    }).usePlugin(
        browserPlugin({
            useHash: true,
        }),
    );
}
