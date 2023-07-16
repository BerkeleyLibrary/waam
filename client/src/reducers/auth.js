import {
    REQUEST_LOGIN,
    RECEIVE_LOGIN,
    LOGIN_FAILED,
    RECEIVE_USER,
    LOGGED_OUT,
    LOGGING_OUT,
    SIGNING_UP,
    SIGNED_UP,
    SIGN_UP_FAILED,
} from '../actions/actionTypes';

const initialSate = {
    isFetching: false,
    user: null,
    error: '',
    signedUp: false,
};

function auth(state = initialSate, action) {
    switch (action.type) {
        case SIGNED_UP:
            return Object.assign({}, state, {
                user: null,
                isFetching: false,
                error: '',
                signedUp: true,
            });
        case RECEIVE_LOGIN:
        case RECEIVE_USER:
            return Object.assign({}, state, {
                user: action.user,
                isFetching: false,
            });
        case REQUEST_LOGIN:
        case LOGGING_OUT:
        case SIGNING_UP:
            return Object.assign({}, state, { isFetching: true });
        case LOGIN_FAILED:
        case SIGN_UP_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
            });
        case LOGGED_OUT:
            return Object.assign({}, state, { isFetching: false, user: null });
        default:
            return state;
    }
}

export default auth;
