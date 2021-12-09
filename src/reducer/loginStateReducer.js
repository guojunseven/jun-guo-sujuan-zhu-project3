import loginStateParam from '../param';

const defaultState = loginStateParam.Undefined;

export default function loginStateReducer(state=defaultState, action) {
    if (action.type === 'login') {
        return action.state;
    }
    return state;
}

