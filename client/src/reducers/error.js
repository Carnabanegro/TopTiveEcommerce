import {AN_ERROR_OCCURRED, CLEAR_ERROR} from '../actions';

const defaultState = {anErrorOccurred: false, errorMsg: null, sagaName: null};

export default function error(state = defaultState, action) {
    switch (action.type) {
        case AN_ERROR_OCCURRED:
            /* eslint no-console: 0 */
            console.log(`%c !!! ${action.error.errorMsg} !!!`, 'color: #df0101; font-size: 15px;');
            return {
                ...state,
                anErrorOccurred: action.error.anErrorOccurred,
                errorMsg: action.error.errorMsg,
                sagaName: action.error.sagaName
            };
        case CLEAR_ERROR:
            return {...defaultState};
        default:
            return state;
    }
}