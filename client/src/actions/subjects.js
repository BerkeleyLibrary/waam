import { get, post } from '../api/Api';

import {
    ADDING_SUBJECT,
    SUBJECT_ADDED_SUCCESS,
    SUBJECT_ADDED_ERROR,
    REQUEST_SUBJECTS,
    RECEIVE_SUBJECTS,
    CLEAN_UP_SUBJECTS,
    REQUEST_SINGLE_SUBJECT,
    RECEIVE_SINGLE_SUBJECT,
    DELETE_SUBJECT_SUCCESS,
    DELETING_SUBJECT,
    CLEAN_UP_SUBJECT,
    RECEIVE_NORMALIZED_SUBJECTS,
} from './actionTypes';

import genericError from './genericError';

import { fetchSeeAlso } from './crossReferences';

/*
 * action creators
 */

export function cleanUpSubjects() {
    return {
        type: CLEAN_UP_SUBJECTS,
    };
}

export function cleanUpSingleSubject() {
    return {
        type: CLEAN_UP_SUBJECT,
    };
}

function deleting() {
    return {
        type: DELETING_SUBJECT,
    };
}

function deleteSubjectSuccess() {
    return {
        type: DELETE_SUBJECT_SUCCESS,
    };
}
export function deleteSubject(id) {
    return dispatch => {
        dispatch(deleting());
        return post('/api/subjects/delete', { id }, true).then(json => {
            if (json.error) {
                dispatch(genericError(json.error));
            } else {
                dispatch(deleteSubjectSuccess());
            }
        });
    };
}

export function addSubject(data) {
    return dispatch => {
        dispatch(addingSubject());
        return post('/api/subjects/add', data, true)
            .then(json => {
                if (json.error) {
                    return dispatch(subjectAddedError(json.error));
                }
                return dispatch(subjectAddedSuccess(json));
            })
            .catch(err => {
                dispatch(genericError(err.message));
            });
    };
}

function addingSubject() {
    return {
        type: ADDING_SUBJECT,
    };
}

function subjectAddedSuccess(payload) {
    return {
        type: SUBJECT_ADDED_SUCCESS,
        payload,
    };
}

function subjectAddedError(serverError) {
    return {
        type: SUBJECT_ADDED_ERROR,
        serverError,
    };
}

export function fetchSubjects(query) {
    return dispatch => {
        dispatch(requestSubjects(query));
        dispatch(fetchSeeAlso(query));
        return get('/api/subjects', query)
            .then(json => {
                if (json.error) {
                    return dispatch(genericError(json.error));
                }
                return dispatch(receiveSubjects(json, query));
            })
            .catch(err => {
                dispatch(genericError(err.message));
            });
    };
}

export function requestSubjects(query) {
    return {
        type: REQUEST_SUBJECTS,
        query,
    };
}

export function receiveSubjects(subjects) {
    return {
        type: RECEIVE_SUBJECTS,
        subjects,
    };
}

function shouldFetch(state) {
    const { subjects } = state;
    return !subjects.isFetching;
}

function shouldFetchNormalizedSubject(state) {
    const { subjects: { normalizedSubjects } } = state;
    return !normalizedSubjects.length;
}

export function fetchSubjectsIfNeeded(query) {
    return (dispatch, getState) => {
        if (query && query.query) {
            if (shouldFetch(getState())) {
                return dispatch(fetchSubjects(query));
            }
        } else {
            dispatch(fetchSeeAlso(query));
            return dispatch(receiveSubjects({ results: [] }));
        }
    };
}

function receiveNormalizedSubjects(normalizedSubjects) {
    return {
        type: RECEIVE_NORMALIZED_SUBJECTS,
        normalizedSubjects,
    };
}

function fetchNormalizedSubjects() {
    return dispatch => {
        dispatch(requestSubjects());
        return get('/api/normalizedSubjects')
            .then(json => {
                if (json.error) {
                    return dispatch(genericError(json.error));
                }
                return dispatch(receiveNormalizedSubjects(json));
            })
            .catch(err => {
                dispatch(genericError(err.message));
            });
    };
}

export function fetchNormalizedSubjectsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchNormalizedSubject(getState())) {
            return dispatch(fetchNormalizedSubjects());
        }
    };
}

function requestSingleSubject() {
    return {
        type: REQUEST_SINGLE_SUBJECT,
    };
}

export function receiveSingleSubject(subject) {
    return {
        type: RECEIVE_SINGLE_SUBJECT,
        subject,
    };
}

function fetchSingleSubject(id, subjects) {
    const found = subjects.response.results.find(item => item.id === id);
    if (found) {
        return dispatch => {
            dispatch(receiveSingleSubject(found));
        };
    } else {
        return dispatch => {
            dispatch(requestSingleSubject());
            return get(`/api/subjects/view/${id}`)
                .then(json => {
                    if (json.error) {
                        return dispatch(genericError(json.error));
                    }
                    return dispatch(receiveSingleSubject(json));
                })
                .catch(err => {
                    dispatch(genericError(err.message));
                });
        };
    }
}

export function fetchSingleSubjectIfNeeded(id) {
    return (dispatch, getState) => {
        const { subjects } = getState();

        const { selectedSubject } = subjects;
        if (!selectedSubject || selectedSubject.id !== id) {
            return dispatch(fetchSingleSubject(id, subjects));
        }
    };
}
