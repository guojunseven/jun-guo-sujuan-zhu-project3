import NavBar from "./navbar";
import Alert from './alert';
import axios from 'axios';
import { Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from "react-router";
import loginStateParam from './param';
import './css/home.css';

export default function Home() {

    const navigate = useNavigate();
    const [loginState, setLogin] = useState(loginStateParam.Undefined); // store the login state
    const [title, setTitle] = useState('');
    const [user, setUser] = useState('');
    const[alert, setAlert] = useState({msg: '', type: 'warning'});

    if (loginState === loginStateParam.Undefined) { 
        axios.get('/api/user/loggedIn').then(res => { // check the login state with back server
            setLogin(loginStateParam.LoggedIn);
            setUser(res.data.username);
        }).catch((err) => setLogin(loginStateParam.LoggedOut))
    }
 
    const search = () => {
        if (! title) {
            setAlert({type: 'warning', msg:"Must provide a valid job title for searching"});
        } else {
            navigate('/search', {state: title});
        }
    }
    
    const logout = () => { // logout api request
        axios.post('/api/user/logout').then(res => setLogin(loginStateParam.LoggedOut)
        ).catch(err => console.log(err));
    };

    return (
        <div className="homepage">
            <NavBar loginstate={loginState} logout={logout} username={user}/>
            <Alert msg={alert.msg} type={alert.type} setAlert={setAlert}/>
            <div className="main">
                <h1 className='home-title'>Meet Your Offers</h1>
                <Form className='form'>
                    <Form.Group className="mb-3" id='input' controlId="formBasicEmail">
                        <Form.Control type="text" id='search' placeholder="Search jobs" value={title}
                        onChange={e => setTitle(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" className='button' onClick={search}>
                        Search
                    </Button>
                </Form>
            </div>
        </div>
    )
}