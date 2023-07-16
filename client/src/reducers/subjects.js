import {
    ADDING_SUBJECT,
    SUBJECT_ADDED_SUCCESS,
    SUBJECT_ADDED_ERROR,
    REQUEST_SUBJECTS,
    RECEIVE_SUBJECTS,
    CLEAN_UP_SUBJECTS,
    REQUEST_SINGLE_SUBJECT,
    RECEIVE_SINGLE_SUBJECT,
    GENERIC_ERROR,
    DELETE_SUBJECT_SUCCESS,
    DELETING_SUBJECT,
    CLEAN_UP_SUBJECT,
    RECEIVE_NORMALIZED_SUBJECTS,
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
    selectedSubject: null,
    query: {},
    normalizedSubjects: [],
};

function subjects(state = initialState, action) {
    switch (action.type) {
        case CLEAN_UP_SUBJECTS:
            return Object.assign({}, state, initialState);
        case GENERIC_ERROR:
        case SUBJECT_ADDED_ERROR:
            return Object.assign({}, state, {
                serverError: action.genericError,
                isFetching: false,
            });
        case REQUEST_SUBJECTS:
            return Object.assign({}, state, {
                query: action.query,
                isFetching: true,
            });
        case RECEIVE_SUBJECTS:
            return Object.assign({}, state, {
                response: action.subjects,
                isFetching: false,
            });
        case REQUEST_SINGLE_SUBJECT:
            return Object.assign({}, state, {
                selectedSubject: null,
                isFetching: true,
            });
        case RECEIVE_SINGLE_SUBJECT:
            return Object.assign({}, state, {
                selectedSubject: action.subject,
                isFetching: false,
            });
        case RECEIVE_NORMALIZED_SUBJECTS:
            return Object.assign({}, state, {
                normalizedSubjects: action.normalizedSubjects,
                isFetching: false,
            });
        case ADDING_SUBJECT:
            return Object.assign({}, state, {
                serverError: '',
                isFetching: true,
            });
        case SUBJECT_ADDED_SUCCESS:
            return Object.assign({}, state, {
                newRecord: action.payload,
                serverError: '',
                isFetching: false,
            });
        case DELETING_SUBJECT:
            return Object.assign({}, state, {
                serverError: '',
                isFetching: true,
            });
        case DELETE_SUBJECT_SUCCESS:
            return Object.assign({}, state, {
                deleted: true,
                isFetching: false,
            });
        case CLEAN_UP_SUBJECT:
            return Object.assign({}, state, {
                deleted: false,
                newRecord: null,
                isFetching: false,
            });
        default:
            return state;
    }
}

export default subjects;
