import {
    ADDING_MANUSCRIPT,
    MANUSCRIPT_ADDED_SUCCESS,
    MANUSCRIPT_ADDED_ERROR,
    GENERIC_ERROR,
    CLEAN_UP_MANUSCRIPTS,
    RECEIVE_MANUSCRIPTS,
    REQUEST_MANUSCRIPTS,
    RECEIVE_SINGLE_MANUSCRIPT,
    REQUEST_SINGLE_MANUSCRIPT,
    DELETE_MANUSCRIPT_SUCCESS,
    DELETING_MANUSCRIPT,
    CLEAN_UP_MANUSCRIPT,
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
    selectedManuscript: null,
    query: {},
};

function manuscripts(state = initialState, action) {
    switch (action.type) {
        case CLEAN_UP_MANUSCRIPTS:
            return Object.assign({}, state, initialState);
        case GENERIC_ERROR:
        case MANUSCRIPT_ADDED_ERROR:
            return Object.assign({}, state, {
                serverError: action.genericError,
                isFetching: false,
            });
        case REQUEST_MANUSCRIPTS:
            return Object.assign({}, state, {
                serverError: '',
                query: action.query,
                isFetching: true,
            });
        case RECEIVE_MANUSCRIPTS:
            return Object.assign({}, state, {
                serverError: '',
                response: action.manuscripts,
                isFetching: false,
            });
        case REQUEST_SINGLE_MANUSCRIPT:
            return Object.assign({}, state, {
                serverError: '',
                selectedManuscript: null,
                isFetching: true,
            });
        case RECEIVE_SINGLE_MANUSCRIPT:
            return Object.assign({}, state, {
                serverError: '',
                selectedManuscript: action.manuscript,
                isFetching: false,
            });
        case ADDING_MANUSCRIPT:
            return Object.assign({}, state, {
                serverError: '',
                isFetching: true,
            });
        case MANUSCRIPT_ADDED_SUCCESS:
            return Object.assign({}, state, {
                newRecord: action.payload,
                serverError: '',
                isFetching: false,
            });
        case DELETING_MANUSCRIPT:
            return Object.assign({}, state, {
                serverError: '',
                isFetching: true,
            });
        case DELETE_MANUSCRIPT_SUCCESS:
            return Object.assign({}, state, {
                deleted: true,
                isFetching: false,
            });
        case CLEAN_UP_MANUSCRIPT:
            return Object.assign({}, state, {
                deleted: false,
                newRecord: null,
                isFetching: false,
            });
        default:
            return state;
    }
}

export default manuscripts;
