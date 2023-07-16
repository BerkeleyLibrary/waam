import { get, post } from '../api/Api';

import {
    ADDING_NISBA,
    NISBA_ADDED_SUCCESS,
    NISBA_ADDED_ERROR,
    REQUEST_NISBAS,
    RECEIVE_NISBAS,
    CLEAN_UP_NISBAS,
    REQUEST_SINGLE_NISBA,
    RECEIVE_SINGLE_NISBA,
    DELETE_NISBA_SUCCESS,
    DELETING_NISBA,
    CLEAN_UP_NISBA,
} from './actionTypes';

import genericError from './genericError';

import { fetchSeeAlso } from './crossReferences';

/*
 * action creators
 */

export function cleanUpNisbas() {
    return {
        type: CLEAN_UP_NISBAS,
    };
}

export function cleanUpSingleNisba() {
    return {
        type: CLEAN_UP_NISBA,
    };
}

function deleting() {
    return {
        type: DELETING_NISBA,
    };
}

function deleteNisbaSuccess() {
    return {
        type: DELETE_NISBA_SUCCESS,
    };
}
export function deleteNisba(id) {
    return dispatch => {
        dispatch(deleting());
        return post('/api/nisbas/delete', { id }, true).then(json => {
            if (json.error) {
                dispatch(genericError(json.error));
            } else {
                dispatch(deleteNisbaSuccess());
            }
        });
    };
}

export function addNisba(data) {
    return dispatch => {
        dispatch(addingNisba());
        return post('/api/nisbas/add', data, true)
            .then(json => {
                if (json.error) {
                    return dispatch(nisbaAddedError(json.error));
                }
                return dispatch(nisbaAddedSuccess(json));
            })
            .catch(err => {
                dispatch(genericError(err.message));
            });
    };
}

function addingNisba() {
    return {
        type: ADDING_NISBA,
    };
}

function nisbaAddedSuccess(payload) {
    return {
        type: NISBA_ADDED_SUCCESS,
        payload,
    };
}

function nisbaAddedError(serverError) {
    return {
        type: NISBA_ADDED_ERROR,
        serverError,
    };
}

export function fetchNisbas(query) {
    return dispatch => {
        dispatch(requestNisbas(query));
        dispatch(fetchSeeAlso(query));
        return get('/api/nisbas', query)
            .then(json => {
                if (json.error) {
                    return dispatch(genericError(json.error));
                }
                return dispatch(receiveNisbas(json, query));
            })
            .catch(err => {
                dispatch(genericError(err.message));
            });
    };
}

export function requestNisbas(query) {
    return {
        type: REQUEST_NISBAS,
        query,
    };
}

export function receiveNisbas(nisbas) {
    return {
        type: RECEIVE_NISBAS,
        nisbas,
    };
}

function shouldFetch(state) {
    const { nisbas } = state;
    return !nisbas.isFetching;
}

export function fetchNisbasIfNeeded(query) {
    return (dispatch, getState) => {
        if (query && query.query) {
            if (shouldFetch(getState())) {
                return dispatch(fetchNisbas(query));
            }
        } else {
            dispatch(fetchSeeAlso(query));
            return dispatch(receiveNisbas({ results: [] }));
        }
    };
}

function requestSingleNisba() {
    return {
        type: REQUEST_SINGLE_NISBA,
    };
}

export function receiveSingleNisba(nisba) {
    return {
        type: RECEIVE_SINGLE_NISBA,
        nisba,
    };
}

function fetchSingleNisba(id, nisbas) {
    const found = nisbas.response.results.find(item => item.id === id);
    if (found) {
        return dispatch => {
            dispatch(receiveSingleNisba(found));
        };
    } else {
        return dispatch => {
            dispatch(requestSingleNisba());
            return get(`/api/nisbas/view/${id}`)
                .then(json => {
                    if (json.error) {
                        return dispatch(genericError(json.error));
                    }
                    return dispatch(receiveSingleNisba(json));
                })
                .catch(err => {
                    dispatch(genericError(err.message));
                });
        };
    }
}

export function fetchSingleNisbaIfNeeded(id) {
    return (dispatch, getState) => {
        const { nisbas } = getState();

        const { selectedNisba } = nisbas;
        if (!selectedNisba || selectedNisba.id !== id) {
            return dispatch(fetchSingleNisba(id, nisbas));
        }
    };
}
