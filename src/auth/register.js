import NavBar from '../navbar';
import axios from 'axios';
import { useState } from 'react';
import { Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import loginStateParam from '../param';
import config from '../param';
import Alert from '../alert';

export default function Register() {

    const navigate = useNavigate();

    const[userData, setUserData] = useState({name: '', password: '', match: ''})
    const[alert, setAlert] = useState({msg: '', type: 'danger'});
    const [loginState, setLogin] = useState(loginStateParam.Undefined); // store the login state
    const [user, setUser] = useState('');

    if (loginState === loginStateParam.Undefined) { 
        axios.get('/api/user/loggedIn', config).then(res => { // check the login state with back server
            setLogin(loginStateParam.LoggedIn);
            setUser(res.data.username);
        }).catch((err) => setLogin(loginStateParam.LoggedOut))
    }

    function register() { // register logic and api request
        if (userData.password !== userData.match) {
            setAlert({msg: "Passwords don't match. Please try again !", type:"warning"});
            return;
        }
        axios.post("/api/user/register", userData)
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
             <NavBar loginstate={loginState} logout={logout} username={user}/>
             <Alert msg={alert.msg} setAlert={setAlert} type={alert.type}/>
            <h1>Sign Up</h1>
            <div className='auth-content'>
            <Form>
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
                <Button variant="primary" className='auth-button' onClick={register}>
                    Sign Up
                </Button>
            </Form>
            </div>
        </div>
    )
}