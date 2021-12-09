const defaultState = {alertType: 'danger', alertMsg: ''};

export default function alertReducer(state=defaultState, action) { 
    if (action.type === 'alert') { //control the type and content of alert component
        return {alertType: action.alertType, alertMsg: action.alertMsg};
    }
    return state
}