import { Alert } from 'react-bootstrap';

export default function AlertComponent(props) {

    if (props.msg) {
        return (
            <Alert variant={props.type} onClose={() => props.setAlert({msg: ''})} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                   {props.msg}
                </p>
            </Alert>
        )
    } else {
        return null;
    }   
}