import {
    SESSION_RECEIVED,
} from '../actions';

export default function session(state = {loading: false, requested: false}, action) {
    switch (action.type) {
        case SESSION_RECEIVED:
            return {
                // eslint-disable-next-line max-len
                ...state,
                profile: action.profile,
                token: action.token,
                loading: false,
            };
        default:
            return state;
    }
}