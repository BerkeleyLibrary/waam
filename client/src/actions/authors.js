import { get, post } from '../api/Api';

import {
    ADDING_AUTHOR,
    AUTHOR_ADDED_SUCCESS,
    AUTHOR_ADDED_ERROR,
    REQUEST_AUTHORS,
    RECEIVE_AUTHORS,
    CLEAN_UP_AUTHORS,
    REQUEST_SINGLE_AUTHOR,
    RECEIVE_SINGLE_AUTHOR,
    DELETE_AUTHOR_SUCCESS,
    DELETING_AUTHOR,
    CLEAN_UP_AUTHOR,
} from './actionTypes';

import genericError from './genericError';

import { fetchSeeAlso } from './crossReferences';

/*
 * action creators
 */

export function cleanUpAuthors() {
    return {
        type: CLEAN_UP_AUTHORS,
    };
}

export function cleanUpSingleAuthor() {
    return {
        type: CLEAN_UP_AUTHOR,
    };
}

function deleting() {
    return {
        type: DELETING_AUTHOR,
    };
}

function deleteAuthorSuccess() {
    return {
        type: DELETE_AUTHOR_SUCCESS,
    };
}
export function deleteAuthor(id) {
    return dispatch => {
        dispatch(deleting());
        return post('/api/authors/delete', { id }, true).then(json => {
            if (json.error) {
                dispatch(genericError(json.error));
            } else {
                dispatch(deleteAuthorSuccess());
            }
        });
    };
}

export function addAuthor(data) {
    return dispatch => {
        dispatch(addingAuthor());
        return post('/api/authors/add', data, true)
            .then(json => {
                if (json.error) {
                    return dispatch(authorAddedError(json.error));
                }
                return dispatch(authorAddedSuccess(json));
            })
            .catch(err => {
                dispatch(genericError(err.message));
            });
    };
}

function addingAuthor() {
    return {
        type: ADDING_AUTHOR,
    };
}

function authorAddedSuccess(payload) {
    return {
        type: AUTHOR_ADDED_SUCCESS,
        payload,
    };
}

function authorAddedError(serverError) {
    return {
        type: AUTHOR_ADDED_ERROR,
        serverError,
    };
}

export function fetchAuthors(query) {
    return (dispatch, getState) => {
        dispatch(requestAuthors(query));
        dispatch(fetchSeeAlso(query));
        const admin = !!(getState().auth.user && getState().auth.user.admin);
        return get('/api/authors', { admin, ...query })
            .then(json => {
                if (json.error) {
                    return dispatch(genericError(json.error));
                }
                return dispatch(receiveAuthors(json, query));
            })
            .catch(err => {
                dispatch(genericError(err.message));
            });
    };
}

export function requestAuthors(query) {
    return {
        type: REQUEST_AUTHORS,
        query,
    };
}

export function receiveAuthors(authors) {
    return {
        type: RECEIVE_AUTHORS,
        authors,
    };
}

function shouldFetch(state) {
    const { authors } = state;
    return !authors.isFetching;
}

export function fetchAuthorsIfNeeded(query) {
    return (dispatch, getState) => {
        if (query && query.query) {
            if (shouldFetch(getState())) {
                return dispatch(fetchAuthors(query));
            }
        } else {
            dispatch(fetchSeeAlso(query));
            return dispatch(receiveAuthors({ results: [] }));
        }
    };
}

function requestSingleAuthor() {
    return {
        type: REQUEST_SINGLE_AUTHOR,
    };
}

export function receiveSingleAuthor(author) {
    return {
        type: RECEIVE_SINGLE_AUTHOR,
        author,
    };
}

function fetchSingleAuthor(id) {
    return dispatch => {
        dispatch(requestSingleAuthor());
        return get(`/api/authors/view/${id}`)
            .then(json => {
                if (json.error) {
                    return dispatch(genericError(json.error));
                }
                return dispatch(receiveSingleAuthor(json));
            })
            .catch(err => {
                dispatch(genericError(err.message));
            });
    };
}

export function fetchSingleAuthorIfNeeded(id) {
    return (dispatch, getState) => {
        const { authors } = getState();

        const { selectedAuthor } = authors;
        if (!selectedAuthor || selectedAuthor.id !== id) {
            return dispatch(fetchSingleAuthor(id));
        }
    };
}
