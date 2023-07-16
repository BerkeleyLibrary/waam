import { post, get } from '../api/Api';

import genericError from './genericError';

import {
    REQUEST_LOGIN,
    RECEIVE_LOGIN,
    LOGIN_FAILED,
    REQUEST_USER,
    RECEIVE_USER,
    LOGGED_OUT,
    LOGGING_OUT,
    SIGNING_UP,
    SIGNED_UP,
    SIGN_UP_FAILED,
} from './actionTypes';

function requestLogin() {
    return {
        type: REQUEST_LOGIN,
    };
}

function receiveLogin(response) {
    return {
        type: RECEIVE_LOGIN,
        user: response,
    };
}

function loginFailed(json) {
    return {
        type: LOGIN_FAILED,
        ...json,
    };
}

export function loginAction(values, history) {
    return dispatch => {
        dispatch(requestLogin());
        return post('/api/login', values, true).then(json => {
            if (json.error) {
                dispatch(loginFailed(json));
            } else {
                dispatch(receiveLogin(json));
                history.push('/dashboard');
            }
        });
    };
}

// logout

function loggedOut() {
    return {
        type: LOGGED_OUT,
    };
}

function loggingOut() {
    return {
        type: LOGGING_OUT,
    };
}

export function logoutAction(history) {
    return dispatch => {
        dispatch(loggingOut());
        return get('/api/logout', null, true).then(json => {
            dispatch(loggedOut());
            history.push('/');
        });
    };
}

// sign up

function signingUp() {
    return {
        type: SIGNING_UP,
    };
}

function signedUp() {
    return {
        type: SIGNED_UP,
    };
}

function signUpFailed(json) {
    return {
        type: SIGN_UP_FAILED,
        ...json,
    };
}

export function signUpAction(values) {
    return dispatch => {
        dispatch(signingUp());
        return post('/api/sign-up', values, true).then(json => {
            if (json.error) {
                dispatch(signUpFailed(json));
            } else {
                dispatch(signedUp());
            }
        });
    };
}

// current logged in user

export function requestUser() {
    return {
        type: REQUEST_USER,
    };
}

export function receiveUser(response) {
    return {
        type: RECEIVE_USER,
        user: response.error ? null : response,
    };
}

export function fetchUser() {
    return dispatch => {
        dispatch(requestUser());
        return get('/api/me', null, true).then(json =>
            dispatch(receiveUser(json))
        );
    };
}

function shouldFetchUser(state) {
    const auth = state.auth;
    return !auth.isFetching;
}

export function fetchUserIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchUser(getState())) {
            return dispatch(fetchUser());
        }
    };
}

function updating() {
    return {
        type: 'UPDATING_ME',
    };
}

function updated() {
    return {
        type: 'UPDATED_ME',
    };
}

export function update(values, history) {
    return dispatch => {
        dispatch(updating());
        return post('/api/me/update', values, true).then(json => {
            if (json.error) {
                dispatch(genericError(json.error));
            } else {
                dispatch(updated());
                dispatch(fetchUserIfNeeded());
                history.push('/dashboard');
            }
        });
    };
}
