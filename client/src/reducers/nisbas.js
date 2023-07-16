import {
    RECEIVE_NISBAS,
    REQUEST_NISBAS,
    RECEIVE_SINGLE_NISBA,
    REQUEST_SINGLE_NISBA,
    ADDING_NISBA,
    NISBA_ADDED_SUCCESS,
    NISBA_ADDED_ERROR,
    GENERIC_ERROR,
    CLEAN_UP_NISBAS,
    DELETE_NISBA_SUCCESS,
    DELETING_NISBA,
    CLEAN_UP_NISBA,
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
    selectedNisba: null,
    query: {},
};

function nisbas(state = initialState, action) {
    switch (action.type) {
        case CLEAN_UP_NISBAS:
            return Object.assign({}, state, initialState);
        case GENERIC_ERROR:
        case NISBA_ADDED_ERROR:
            return Object.assign({}, state, {
                serverError: action.genericError,
                isFetching: false,
            });
        case REQUEST_NISBAS:
            return Object.assign({}, state, {
                query: action.query,
                isFetching: true,
            });
        case RECEIVE_NISBAS:
            return Object.assign({}, state, {
                response: action.nisbas,
                isFetching: false,
            });
        case REQUEST_SINGLE_NISBA:
            return Object.assign({}, state, {
                selectedNisba: null,
                isFetching: true,
            });
        case RECEIVE_SINGLE_NISBA:
            return Object.assign({}, state, {
                selectedNisba: action.nisba,
                isFetching: false,
            });
        case ADDING_NISBA:
            return Object.assign({}, state, {
                serverError: '',
                isFetching: true,
            });
        case NISBA_ADDED_SUCCESS:
            return Object.assign({}, state, {
                newRecord: action.payload,
                serverError: '',
                isFetching: false,
            });
        case DELETING_NISBA:
            return Object.assign({}, state, {
                serverError: '',
                isFetching: true,
            });
        case DELETE_NISBA_SUCCESS:
            return Object.assign({}, state, {
                deleted: true,
                isFetching: false,
            });
        case CLEAN_UP_NISBA:
            return Object.assign({}, state, {
                deleted: false,
                newRecord: null,
                isFetching: false,
            });

        default:
            return state;
    }
}

export default nisbas;
