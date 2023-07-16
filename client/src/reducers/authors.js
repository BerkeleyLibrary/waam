import {
    RECEIVE_AUTHORS,
    REQUEST_AUTHORS,
    RECEIVE_SINGLE_AUTHOR,
    REQUEST_SINGLE_AUTHOR,
    ADDING_AUTHOR,
    AUTHOR_ADDED_SUCCESS,
    AUTHOR_ADDED_ERROR,
    GENERIC_ERROR,
    CLEAN_UP_AUTHORS,
    DELETE_AUTHOR_SUCCESS,
    DELETING_AUTHOR,
    CLEAN_UP_AUTHOR,
} from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    genericError: '',
    newRecord: null,
    deleted: false,
    response: {
        pagination: {},
        results: [],
    },
    selectedAuthor: null,
    query: {},
};

function authors(state = initialState, action) {
    switch (action.type) {
        case CLEAN_UP_AUTHORS:
            return Object.assign({}, state, initialState);
        case GENERIC_ERROR:
        case AUTHOR_ADDED_ERROR:
            return Object.assign({}, state, {
                serverError: action.genericError,
                isFetching: false,
            });
        case REQUEST_AUTHORS:
            return Object.assign({}, state, {
                query: action.query,
                isFetching: true,
            });
        case RECEIVE_AUTHORS:
            return Object.assign({}, state, {
                response: action.authors,
                isFetching: false,
            });
        case REQUEST_SINGLE_AUTHOR:
            return Object.assign({}, state, {
                selectedAuthor: null,
                isFetching: true,
            });
        case RECEIVE_SINGLE_AUTHOR:
            return Object.assign({}, state, {
                selectedAuthor: action.author,
                isFetching: false,
            });
        case ADDING_AUTHOR:
            return Object.assign({}, state, {
                serverError: '',
                isFetching: true,
            });
        case AUTHOR_ADDED_SUCCESS:
            return Object.assign({}, state, {
                newRecord: action.payload,
                serverError: '',
                isFetching: false,
            });
        case DELETING_AUTHOR:
            return Object.assign({}, state, {
                serverError: '',
                isFetching: true,
            });
        case DELETE_AUTHOR_SUCCESS:
            return Object.assign({}, state, {
                deleted: true,
                isFetching: false,
            });
        case CLEAN_UP_AUTHOR:
            return Object.assign({}, state, {
                deleted: false,
                newRecord: null,
                isFetching: false,
            });
        default:
            return state;
    }
}

export default authors;
