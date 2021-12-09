export default function loginStateAction(alertState) {
    return {
        type: 'alert',
        alertType: alertState.type,
        alertMsg: alertState.msg
    }
}