import React from 'react';

import { Provider } from 'react-redux';

import configureStore from '../configureStore';

import Main from './Main';

let locale = localStorage.getItem('locale')
    ? JSON.parse(localStorage.getItem('locale'))
    : 'en';

const store = configureStore({ locale });

store.subscribe(() => {
    let { locale: newLocale } = store.getState();
    if (locale !== newLocale) {
        locale = newLocale;
        localStorage.setItem('locale', JSON.stringify(locale));
    }
});

const Root = () => {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
};

export default Root;
