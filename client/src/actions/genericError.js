import { GENERIC_ERROR } from './actionTypes';

export default function _genericError(genericError) {
    return {
        type: GENERIC_ERROR,
        genericError,
    };
}
