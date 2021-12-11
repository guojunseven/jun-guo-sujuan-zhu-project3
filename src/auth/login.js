import NavBar from '../navbar';
import axios from 'axios';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import loginStateParam from '../param';
import Alert from '../alert';
import './css/auth.css';

export default function Login() {

    const navigate = useNavigate();
    const[userData, setUserData] = useState({name: '', password: ''})
    const [loginState, setLogin] = useState(loginStateParam.Undefined); // store the login state
    const[alert, setAlert] = useState({msg: '', type: 'danger'});
    const [user, setUser] = useState('');

    if (loginState === loginStateParam.Undefined) { 
        axios.get('/api/user/loggedIn').then(res => { // check the login state with back server
            setLogin(loginStateParam.LoggedIn);
            setUser(res.data.username);
        }).catch((err) => setLogin(loginStateParam.LoggedOut))
    }

    function login() {
        if (loginState === loginStateParam.LoggedIn) {
            setAlert({msg: 'You have logged in! Please logged out first.', type: 'warning'});
            return;
        }
        axios.post("/api/user/login", userData)
        .then((res) => {
            navigate(-1);
        })
        .catch((err) => setAlert({type: 'danger', msg: err.response.data}));
    }

    const logout = () => { // logout api request
        axios.post('/api/user/logout').then(res => setLogin(loginStateParam.LoggedOut)
        ).catch(err => console.log(err));
    };

    return (
        <div className='authpage'>
            <NavBar loginstate={loginState} username={user} logout={logout}/>
            <Alert type={alert.type} msg={alert.msg} setAlert={setAlert}/>
            <h1>Log In</h1>
            <div className='auth-content'>
                <Form>
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

                    <Button variant="primary" className='auth-button' onClick={login}>
                        Log In
                    </Button>
                </Form>
            </div>
        </div>
    )
}