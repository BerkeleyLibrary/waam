import { get, post } from '../api/Api';

import {
    REQUEST_CROSS_REFERENCES,
    RECEIVE_CROSS_REFERENCES,
    RECEIVE_CROSS_REFERENCE_SEE_ALSO,
    REQUEST_CROSS_REFERENCE_SEE_ALSO,
    CROSS_REFERENCE_ERROR,
    CLEAR_CROSS_REFERENCE_FORM,
    CREATED_CROSS_REFERENCE,
    CLEAR_CROSS_REFERENCES,
} from './actionTypes';

import genericError from './genericError';

function crossReferenceError(errorMsg) {
    return {
        type: CROSS_REFERENCE_ERROR,
        errorMsg,
    };
}

function clearFrom() {
    return {
        type: CLEAR_CROSS_REFERENCE_FORM,
    };
}

function createdCrossReference() {
    return {
        type: CREATED_CROSS_REFERENCE,
        successMessage:
            'Cross-reference was added successfully, add more using the form below.',
    };
}

export function fetchCrossReferences(query) {
    return dispatch => {
        dispatch(requestCrossReferences(query));
        return get('/api/cross-references', query)
            .then(json => {
                if (json.error) {
                    return dispatch(genericError(json.error));
                }
                return dispatch(receiveCrossReferences(json, query));
            })
            .catch(err => {
                dispatch(crossReferenceError(err.message));
            });
    };
}

export function requestCrossReferences(query) {
    return {
        type: REQUEST_CROSS_REFERENCES,
        query,
    };
}

export function receiveCrossReferences(crossReferences) {
    return {
        type: RECEIVE_CROSS_REFERENCES,
        crossReferences,
    };
}

function shouldFetch(state) {
    const { crossReferences } = state;
    return !crossReferences.isFetching;
}

export function fetchCrossReferencesIfNeeded(query) {
    return (dispatch, getState) => {
        if (shouldFetch(getState())) {
            return dispatch(fetchCrossReferences(query));
        }
    };
}

export function create(values) {
    return dispatch => {
        return post('/api/cross-references/add', values, true).then(json => {
            if (json.error || json.errors) {
                dispatch(
                    crossReferenceError(
                        "Please make sure this cross-reference doesn't already exist."
                    )
                );
            } else {
                dispatch(clearFrom());
                dispatch(createdCrossReference());
                dispatch(fetchCrossReferencesIfNeeded());
            }
        });
    };
}

export function deleteCrossReference(id) {
    return (dispatch, getState) => {
        return post('/api/cross-references/delete', { id }, true).then(json => {
            if (json.error) {
                dispatch(genericError(json.error));
            } else {
                const query = getState().crossReferences.query;
                dispatch(fetchCrossReferencesIfNeeded(query));
            }
        });
    };
}

function receiveSeeAlso(seeAlso) {
    return {
        type: RECEIVE_CROSS_REFERENCE_SEE_ALSO,
        seeAlso,
    };
}

function requestSeeAlso() {
    return {
        type: REQUEST_CROSS_REFERENCE_SEE_ALSO,
    };
}

export function fetchSeeAlso(query) {
    return dispatch => {
        dispatch(requestSeeAlso());

        if (query && query.query) {
            return get('/api/cross-references/view', { query: query.query })
                .then(json => dispatch(receiveSeeAlso(json)))
                .catch(err => dispatch(genericError(err.message)));
        } else {
            return dispatch(receiveSeeAlso([]));
        }
    };
}

export function clearCrossReferences() {
    return {
        type: CLEAR_CROSS_REFERENCES,
    };
}
