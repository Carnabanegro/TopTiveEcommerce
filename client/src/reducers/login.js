import {
    FETCH_LOGIN_REQUESTED,
    FETCH_LOGIN_SUCCEEDED
} from '../actions/login';
import {AN_ERROR_OCCURRED} from '../actions';

export default function login(state = {loading: false, requested: false}, action) {
    switch (action.type) {
        case AN_ERROR_OCCURRED:
            return {
                ...state, loading: false, requested: false, error: true
            };
        case FETCH_LOGIN_REQUESTED:
            return {
                ...state, loading: true, profile: null, requested: true, error: false
            };
        case FETCH_LOGIN_SUCCEEDED:
            return {
                ...state, loading: false, requested: true, locked: false
            };
        default:
            return state;
    }
}