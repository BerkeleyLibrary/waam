import React from 'react';

import { IntlProvider, addLocaleData } from 'react-intl';

import en from 'react-intl/locale-data/en';
import ar from 'react-intl/locale-data/ar';

import translations from '../i18n';

addLocaleData([...ar, ...en]);

const IntlCreator = ({ children, locale }) => {
    let messages = translations[locale];

    return (
        <IntlProvider locale={locale} messages={messages}>
            {children}
        </IntlProvider>
    );
};

export default IntlCreator;