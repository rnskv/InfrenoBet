import apiServices from 'src/services/api';
import events from 'src/services/events';

const { REALTIME_PROTOCOL, REALTIME_PORT, REALTIME_HOST } = process.env;

export const afterApplicationSetupCallback = (app) => {
    if (typeof window === 'undefined') return;

    const {
        api, store, realtime, view,
    } = app.modules;

    api.setServices(apiServices);

    store.create();

    realtime.connect(`${REALTIME_PROTOCOL}://${REALTIME_HOST}:${REALTIME_PORT}`);
    realtime.setEvents(events);

    store.provideApp();
    realtime.provideApp();

    view.render();
};

export const onApplicationRunCallback = (app) => {
    console.log('Приложение запущено.', app);
};

export const onApplicationFailedRunCallback = (err) => {
    console.log('Приложение не удалось запустить.', err);
};
