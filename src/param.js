const LoggedIn = 1;
const LoggedOut = 0;
const Undefined = -1;
const DefaultAlertState = {type: 'danger', msg: ''};
const config = {headers: {
    'Content-Type': 'application/json','Cache-Control' : 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': 0}};

export default {LoggedIn, LoggedOut, Undefined, DefaultAlertState, config};