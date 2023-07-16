import { get, post } from '../api/Api';

import {
    REQUEST_USERS,
    RECEIVE_USERS,
    REQUEST_SINGLE_USER,
    RECEIVE_SINGLE_USER,
} from './actionTypes';

import genericError from './genericError';

/*
 * action creators
 */

export function fetchUsers(query) {
    return dispatch => {
        dispatch(requestUsers(query));
        return get('/api/users', query, true)
            .then(json => {
                if (json.error) {
                    return dispatch(genericError(json.error));
                }
                return dispatch(receiveUsers(json, query));
            })
            .catch(err => {
                dispatch(genericError(err.message));
            });
    };
}

export function requestUsers(query) {
    return {
        type: REQUEST_USERS,
        query,
    };
}

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    };
}

function shouldFetch(state) {
    const { users } = state;
    return !users.isFetching;
}

export function fetchUsersIfNeeded(query) {
    return (dispatch, getState) => {
        if (shouldFetch(getState())) {
            return dispatch(fetchUsers(query));
        }
    };
}

function requestSingleUser() {
    return {
        type: REQUEST_SINGLE_USER,
    };
}

export function receiveSingleUser(user) {
    return {
        type: RECEIVE_SINGLE_USER,
        user,
    };
}

function fetchSingleUser(id, users) {
    const found = users.response.results.find(item => item.id === id);
    if (found) {
        return dispatch => {
            dispatch(receiveSingleUser(found));
        };
    } else {
        return dispatch => {
            dispatch(requestSingleUser());
            return get(`/api/users/${id}`, {}, true)
                .then(json => {
                    if (json.error) {
                        return dispatch(genericError(json.error));
                    }
                    return dispatch(receiveSingleUser(json));
                })
                .catch(err => {
                    dispatch(genericError(err.message));
                });
        };
    }
}

export function fetchSingleUserIfNeeded(id) {
    return (dispatch, getState) => {
        const { users } = getState();

        const { selectedUser } = users;
        if (!selectedUser || selectedUser.id !== id) {
            return dispatch(fetchSingleUser(id, users));
        }
    };
}

function updating() {
    return {
        type: 'UPDATING_USER',
    };
}

function updatedUser() {
    return {
        type: 'UPDATED_USER',
    };
}

export function update(values, history) {
    return dispatch => {
        dispatch(updating());
        return post('/api/users/update', values, true).then(json => {
            if (json.error) {
                dispatch(genericError(json.error));
            } else {
                dispatch(updatedUser());
                dispatch(fetchUsersIfNeeded());
                history.push('/dashboard/users');
            }
        });
    };
}

export function deleteUser(id, history) {
    return dispatch => {
        dispatch(updating());
        return post('/api/users/delete', { id }, true).then(json => {
            if (json.error) {
                dispatch(genericError(json.error));
            } else {
                dispatch(updatedUser());
                dispatch(fetchUsersIfNeeded());
                history.push('/dashboard/users');
            }
        });
    };
}
