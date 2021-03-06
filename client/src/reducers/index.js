import {combineReducers} from 'redux';
import abmStatus from './abmStatus';
import error from './error';
import session from './session';
import login from "./login";
import product from './product';
import order from './order';
import orderStatistics from "./statistics";

export default combineReducers({
    abmStatus,
    error,
    session,
    login,
    product,
    order,
    orderStatistics
});