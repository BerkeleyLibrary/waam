import fetch from 'isomorphic-fetch';

import getFormDataFromJson from '../utils/getFormDataFromJson';

export const post = (url, values, includeCredentials) => {
    const bodyValue =
        typeof values !== 'string' ? JSON.stringify(values) : values;
    return fetch(url, {
        method: 'POST',
        headers: {
            // 'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: includeCredentials ? 'include' : 'omit',
        body: bodyValue,
    }).then(response => response.json());
};

export const get = (url, values, includeCredentials) => {
    const options = {
        credentials: includeCredentials ? 'include' : 'omit',
    };

    if (values) {
        url = url + '?' + getFormDataFromJson(values);
    }

    return fetch(url, options).then(response => response.json());
};
