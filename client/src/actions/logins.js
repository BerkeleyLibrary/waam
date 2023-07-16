import { get } from '../api/Api';

import { REQUEST_LOGINS, RECEIVE_LOGINS } from './actionTypes';

import genericError from './genericError';

/*
 * action creators
 */

export function fetchLogins(query) {
    return dispatch => {
        dispatch(requestLogins(query));
        return get('/api/logins', query, true)
            .then(json => {
                if (json.error) {
                    return dispatch(genericError(json.error));
                }
                return dispatch(receiveLogins(json, query));
            })
            .catch(err => {
                dispatch(genericError(err.message));
            });
    };
}

export function requestLogins(query) {
    return {
        type: REQUEST_LOGINS,
        query,
    };
}

export function receiveLogins(logins) {
    return {
        type: RECEIVE_LOGINS,
        logins,
    };
}

function shouldFetch(state) {
    const { logins } = state;
    return !logins.isFetching;
}

export function fetchLoginsIfNeeded(query) {
    return (dispatch, getState) => {
        if (shouldFetch(getState())) {
            return dispatch(fetchLogins(query));
        }
    };
}
