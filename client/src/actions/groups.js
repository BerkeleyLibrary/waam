import { get } from '../api/Api';

import {
    REQUEST_GROUPS,
    RECEIVE_GROUPS,
    REQUEST_SINGLE_GROUP,
    RECEIVE_SINGLE_GROUP,
} from './actionTypes';

import genericError from './genericError';

/*
 * action creators
 */

export function fetchGroups() {
    return (dispatch, getState) => {
        dispatch(requestGroups());
        const admin = !!(getState().auth.user && getState().auth.user.admin);
        return get('/api/groups', { admin, npp: 100 })
            .then(json => {
                if (json.error) {
                    return dispatch(genericError(json.error));
                }
                return dispatch(receiveGroups(json));
            })
            .catch(err => {
                dispatch(genericError(err.message));
            });
    };
}

export function requestGroups(query) {
    return {
        type: REQUEST_GROUPS,
        query,
    };
}

export function receiveGroups(groups) {
    return {
        type: RECEIVE_GROUPS,
        groups,
    };
}

function shouldFetch(state) {
    const { groups } = state;
    return !groups.isFetching;
}

export function fetchGroupsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetch(getState())) {
            return dispatch(fetchGroups());
        }
    };
}

function requestSingleGroup() {
    return {
        type: REQUEST_SINGLE_GROUP,
    };
}

export function receiveSingleGroup(group) {
    return {
        type: RECEIVE_SINGLE_GROUP,
        group,
    };
}

function fetchSingleGroup(id, groups) {
    const found = groups.response.results.find(item => item.id === id);
    if (found) {
        return dispatch => {
            dispatch(receiveSingleGroup(found));
        };
    } else {
        return dispatch => {
            dispatch(requestSingleGroup());
            return get(`/api/groups/view/${id}`)
                .then(json => {
                    if (json.error) {
                        return dispatch(genericError(json.error));
                    }
                    return dispatch(receiveSingleGroup(json));
                })
                .catch(err => {
                    dispatch(genericError(err.message));
                });
        };
    }
}

export function fetchSingleGroupIfNeeded(id) {
    return (dispatch, getState) => {
        const { groups } = getState();

        const { selectedGroup } = groups;
        if (!selectedGroup || selectedGroup.id !== id) {
            return dispatch(fetchSingleGroup(id, groups));
        }
    };
}
