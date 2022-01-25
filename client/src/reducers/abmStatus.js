import {ADD_REQUESTED, REQUESTED_ADD_SUCCEEDED} from '../actions/abmStatus';
import {AN_ERROR_OCCURRED, CLEAR_ERROR} from '../actions';

export default function abmStatus(state = {saving: false}, action) {
    switch (action.type) {
        case CLEAR_ERROR:
            return {
                ...state, saving: false, sending: false, success: false , successMsg: null
            };
        case ADD_REQUESTED:
            return {
                ...state, saving: true, sending: true, success: false
            };
        case REQUESTED_ADD_SUCCEEDED:
            return {
                ...state, saving: false, sending: false, success: true, successMsg: action.successMsg
            };
        case AN_ERROR_OCCURRED:
            return {
                ...state, saving: false, sending: false
            };
        default:
            return state;
    }
}