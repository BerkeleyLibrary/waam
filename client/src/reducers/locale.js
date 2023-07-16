import { CHANGE_LOCALE } from '../actions/actionTypes';

const initialState = 'en';

function locale(state = initialState, action) {
    switch (action.type) {
        case CHANGE_LOCALE:
            return action.locale;
        default:
            return state;
    }
}

export default locale;
