import NavBar from '../navbar';
import axios from 'axios';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Alert from '../alert';
import './css/auth.css';

export default function Login() {

    const navigate = useNavigate();
    const[userData, setUserData] = useState({name: '', password: ''})
    const[alert, setAlert] = useState({msg: '', type: 'danger'});

    function login() {
        axios.post("/api/user/login", userData)
        .then((res) => {
            navigate(-1);
        })
        .catch((err) => setAlert({type: 'danger', msg: err.response.data}));
    }

    return (
        <div className='authpage'>
            <NavBar />
            <h1>Log In</h1>
            <div className='auth-content'>
                <Form>
                    <Alert type={alert.type} msg={alert.msg} setAlert={setAlert}/>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="The username must be unique" value={userData.username}
                        onChange={e => setUserData({...userData, name: e.target.value})}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={userData.password}
                        onChange={e => setUserData({...userData, password: e.target.value})}/>
                    </Form.Group>

                    <Button variant="primary" onClick={login}>
                        Log In
                    </Button>
                </Form>
            </div>
        </div>
    )
}