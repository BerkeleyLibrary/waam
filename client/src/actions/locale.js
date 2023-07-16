import { CHANGE_LOCALE } from './actionTypes';

/*
 * action creators
 */

export function changeLocale(newLocale) {
    return {
        type: CHANGE_LOCALE,
        locale: newLocale,
    };
}
