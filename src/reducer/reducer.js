import { combineReducers } from "redux";
import loginState from './loginStateReducer';
import alertState from './alertReducer';

export default combineReducers({
    loginState: loginState,
    alertState: alertState
})