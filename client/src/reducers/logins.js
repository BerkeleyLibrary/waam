import {
    RECEIVE_LOGINS,
    REQUEST_LOGINS,
    GENERIC_ERROR,
} from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    response: {
        pagination: {},
        results: [],
    },
    selectedAuthor: null,
    query: {},
};

function logins(state = initialState, action) {
    switch (action.type) {
        case GENERIC_ERROR:
            return Object.assign({}, state, {
                serverError: action.genericError,
                isFetching: false,
            });
        case REQUEST_LOGINS:
            return Object.assign({}, state, {
                query: action.query,
                isFetching: true,
            });
        case RECEIVE_LOGINS:
            return Object.assign({}, state, {
                response: action.logins,
                isFetching: false,
            });
        default:
            return state;
    }
}

export default logins;
