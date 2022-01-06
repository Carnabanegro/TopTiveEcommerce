import {
    FETCH_LOGIN_REQUESTED,
    VALID_RECOVER_PASS_TOKEN,
    FETCH_LOGIN_SUCCEEDED,
    REQUEST_VERIFY_TOKEN
} from '../actions/login';
import {AN_ERROR_OCCURRED} from '../actions';

export default function login(state = {loading: false, requested: false}, action) {
    switch (action.type) {
        case VALID_RECOVER_PASS_TOKEN:
            return {
                ...state, token: action.token, loading: false, user: action.user, role: action.role, verifyToken: true
            };
        case REQUEST_VERIFY_TOKEN:
            return {
                ...state, loading: true, requested: true, error: false
            };
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