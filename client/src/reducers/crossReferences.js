import {
    REQUEST_CROSS_REFERENCES,
    RECEIVE_CROSS_REFERENCES,
    RECEIVE_CROSS_REFERENCE_SEE_ALSO,
    CROSS_REFERENCE_ERROR,
    REQUEST_CROSS_REFERENCE_SEE_ALSO,
    CREATED_CROSS_REFERENCE,
    CLEAR_CROSS_REFERENCES,
} from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    errorMsg: '',
    successMessage: '',
    response: {
        pagination: {},
        results: [],
    },
    query: {},
    seeAlso: [],
};

function crossReferences(state = initialState, action) {
    switch (action.type) {
        case REQUEST_CROSS_REFERENCES:
            return Object.assign({}, state, {
                query: action.query,
                isFetching: true,
            });
        case RECEIVE_CROSS_REFERENCES:
            return Object.assign({}, state, {
                response: action.crossReferences,
                isFetching: false,
            });
        case RECEIVE_CROSS_REFERENCE_SEE_ALSO:
            return Object.assign({}, state, { seeAlso: action.seeAlso });
        case REQUEST_CROSS_REFERENCE_SEE_ALSO:
            return Object.assign({}, state, { seeAlso: [] });
        case CROSS_REFERENCE_ERROR:
            return Object.assign({}, state, {
                errorMsg: action.errorMsg,
                successMessage: '',
            });
        case CREATED_CROSS_REFERENCE:
            return Object.assign({}, state, {
                errorMsg: '',
                successMessage: action.successMessage,
            });
        case CLEAR_CROSS_REFERENCES:
            return initialState;
        default:
            return state;
    }
}

export default crossReferences;
