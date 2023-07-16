import {
    RECEIVE_USERS,
    REQUEST_USERS,
    RECEIVE_SINGLE_USER,
    REQUEST_SINGLE_USER,
    GENERIC_ERROR,
} from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    response: {
        pagination: {},
        results: [],
    },
    selectedUser: null,
    query: {},
};

function users(state = initialState, action) {
    switch (action.type) {
        case GENERIC_ERROR:
            return Object.assign({}, state, {
                serverError: action.genericError,
                isFetching: false,
            });
        case REQUEST_USERS:
            return Object.assign({}, state, {
                query: action.query,
                isFetching: true,
            });
        case RECEIVE_USERS:
            return Object.assign({}, state, {
                response: action.users,
                isFetching: false,
            });
        case REQUEST_SINGLE_USER:
            return Object.assign({}, state, {
                serverError: '',
                selectedUser: null,
                isFetching: true,
            });
        case RECEIVE_SINGLE_USER:
            return Object.assign({}, state, {
                serverError: '',
                selectedUser: action.user,
                isFetching: false,
            });

        default:
            return state;
    }
}

export default users;
