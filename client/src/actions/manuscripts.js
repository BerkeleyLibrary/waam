import { get, post } from '../api/Api';

import {
    ADDING_MANUSCRIPT,
    MANUSCRIPT_ADDED_SUCCESS,
    MANUSCRIPT_ADDED_ERROR,
    CLEAN_UP_MANUSCRIPTS,
    REQUEST_MANUSCRIPTS,
    RECEIVE_MANUSCRIPTS,
    REQUEST_SINGLE_MANUSCRIPT,
    RECEIVE_SINGLE_MANUSCRIPT,
    DELETE_MANUSCRIPT_SUCCESS,
    DELETING_MANUSCRIPT,
    CLEAN_UP_MANUSCRIPT,
} from './actionTypes';

import genericError from './genericError';

import { fetchSeeAlso } from './crossReferences';

/*
 * action creators
 */

export function addManuscript(data) {
    return dispatch => {
        dispatch(addingManuscript());
        return post('/api/manuscripts/add', data, true)
            .then(json => {
                if (json.error) {
                    return dispatch(manuscriptAddedError(json.error));
                }
                return dispatch(manuscriptAddedSuccess(json));
            })
            .catch(err => {
                dispatch(genericError(err.message));
            });
    };
}

function addingManuscript() {
    return {
        type: ADDING_MANUSCRIPT,
    };
}

function manuscriptAddedSuccess(payload) {
    return {
        type: MANUSCRIPT_ADDED_SUCCESS,
        payload,
    };
}

function manuscriptAddedError(serverError) {
    return {
        type: MANUSCRIPT_ADDED_ERROR,
        serverError,
    };
}

export function fetchManuscripts(query) {
    return (dispatch, getState) => {
        dispatch(requestManuscripts(query));
        dispatch(fetchSeeAlso(query));
        const admin = !!(getState().auth.user && getState().auth.user.admin);
        return get('/api/manuscripts', { admin, ...query })
            .then(json => {
                if (json.error) {
                    return dispatch(genericError(json.error));
                }
                return dispatch(receiveManuscripts(json, query));
            })
            .catch(err => {
                dispatch(genericError(err.message));
            });
    };
}

export function requestManuscripts(query) {
    return {
        type: REQUEST_MANUSCRIPTS,
        query,
    };
}

export function receiveManuscripts(manuscripts) {
    return {
        type: RECEIVE_MANUSCRIPTS,
        manuscripts,
    };
}

function shouldFetch(state) {
    const { manuscripts } = state;
    return !manuscripts.isFetching;
}

export function fetchManuscriptsIfNeeded(query) {
    return (dispatch, getState) => {
        if (query && query.query) {
            if (shouldFetch(getState())) {
                return dispatch(fetchManuscripts(query));
            }
        } else {
            dispatch(fetchSeeAlso(query));
            return dispatch(receiveManuscripts({ results: [] }));
        }
    };
}

function requestSingleManuscript() {
    return {
        type: REQUEST_SINGLE_MANUSCRIPT,
    };
}

export function receiveSingleManuscript(manuscript) {
    return {
        type: RECEIVE_SINGLE_MANUSCRIPT,
        manuscript,
    };
}

function fetchSingleManuscript(id, manuscripts) {
    const found = manuscripts.response.results.find(item => item.id === id);
    if (found) {
        return dispatch => {
            dispatch(receiveSingleManuscript(found));
        };
    } else {
        return dispatch => {
            dispatch(requestSingleManuscript());
            return get(`/api/manuscripts/view/${id}`)
                .then(json => {
                    if (json.error) {
                        return dispatch(genericError(json.error));
                    }
                    return dispatch(receiveSingleManuscript(json));
                })
                .catch(err => {
                    dispatch(genericError(err.message));
                });
        };
    }
}

export function fetchSingleManuscriptIfNeeded(id) {
    return (dispatch, getState) => {
        const { manuscripts } = getState();

        const { selectedManuscript } = manuscripts;
        if (!selectedManuscript || selectedManuscript.id !== id) {
            return dispatch(fetchSingleManuscript(id, manuscripts));
        }
    };
}

export function cleanUpManuscripts() {
    return {
        type: CLEAN_UP_MANUSCRIPTS,
    };
}

export function cleanUpSingleManuscript() {
    return {
        type: CLEAN_UP_MANUSCRIPT,
    };
}

function deleting() {
    return {
        type: DELETING_MANUSCRIPT,
    };
}

function deleteRecordSuccess() {
    return {
        type: DELETE_MANUSCRIPT_SUCCESS,
    };
}
export function deleteRecord(id) {
    return dispatch => {
        dispatch(deleting());
        return post('/api/manuscripts/delete', { id }, true).then(json => {
            if (json.error) {
                dispatch(genericError(json.error));
            } else {
                dispatch(deleteRecordSuccess());
            }
        });
    };
}
