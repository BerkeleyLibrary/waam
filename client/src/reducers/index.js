import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { CLEAR_CROSS_REFERENCE_FORM } from '../actions/actionTypes';

import manuscripts from './manuscripts';
import authors from './authors';
import subjects from './subjects';
import locale from './locale';
import auth from './auth';
import logins from './logins';
import users from './users';
import nisbas from './nisbas';
import groups from './groups';
import crossReferences from './crossReferences';

const appReducers = combineReducers({
    manuscripts,
    locale,
    authors,
    subjects,
    auth,
    logins,
    users,
    nisbas,
    groups,
    crossReferences,
    form: formReducer.plugin({
        'create-cross-reference': (state, action) => {
            switch (action.type) {
                case CLEAR_CROSS_REFERENCE_FORM:
                    return undefined; // <--- blow away form data
                default:
                    return state;
            }
        },
    }),
});

export default appReducers;
