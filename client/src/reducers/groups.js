import {
    RECEIVE_GROUPS,
    REQUEST_GROUPS,
    RECEIVE_SINGLE_GROUP,
    REQUEST_SINGLE_GROUP,
} from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    response: {
        pagination: {},
        results: [],
    },
    selectedGroup: null,
    query: {},
};

function groups(state = initialState, action) {
    switch (action.type) {
        case REQUEST_GROUPS:
            return Object.assign({}, state, {
                query: action.query,
                isFetching: true,
            });
        case RECEIVE_GROUPS:
            return Object.assign({}, state, {
                response: action.groups,
                isFetching: false,
            });
        case REQUEST_SINGLE_GROUP:
            return Object.assign({}, state, {
                selectedGroup: null,
                isFetching: true,
            });
        case RECEIVE_SINGLE_GROUP:
            return Object.assign({}, state, {
                selectedGroup: action.group,
                isFetching: false,
            });
        default:
            return state;
    }
}

export default groups;
