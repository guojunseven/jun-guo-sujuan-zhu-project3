import NavBar from '../navbar';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Alert from '../alert';

export default function Register() {

    const navigate = useNavigate();

    const[userData, setUserData] = useState({name: '', password: '', match: ''})
    const[alert, setAlert] = useState({msg: '', type: 'danger'});

    function register() { // register logic and api request
        if (userData.password !== userData.match) {
            setAlert("Passwords don't match. Please try again !");
            return;
        }
        axios.post("/api/user/register", userData)
        .then((res) => {
            navigate(-1);
        })
        .catch((err) => setAlert({type: 'danger', msg: err.response.data}));
    }

    return (
        <div className='authpage'>
            <NavBar />
            <div className='auth-content'>
            <h1>Sign Up</h1>
            <Form>
                <Alert msg={alert.msg} setAlert={setAlert} type={alert.type}/>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username must be unique" value={userData.username}
                    onChange={e => setUserData({...userData, name: e.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={userData.password}
                    onChange={e => setUserData({...userData, password: e.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="passwords must match" value={userData.match}
                    onChange={e => setUserData({...userData, match: e.target.value})}/>
                </Form.Group>
                <Button variant="primary" onClick={register}>
                    Sign Up
                </Button>
            </Form>
            </div>
        </div>
    )
}