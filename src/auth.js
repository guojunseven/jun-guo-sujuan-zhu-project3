import axios from 'axios';
import NavBar from './navbar';
import { useState } from 'react';
import loginStateParam from './param';
import { propTypes } from 'react-bootstrap/esm/Image';

export default function Auth(props) {

    const [loginState, setLogin] = useState(loginStateParam.Undefined); // store the login state

    if (loginState === loginStateParam.Undefined) { 
        // the user refreshes the page or is required to validate login state again
        axios.get('/api/user/loggedIn').then(res => { // check the login state with back server
            setLogin(loginStateParam.LoggedIn);
        }).catch((err) => setLogin(loginStateParam.LoggedOut))
    } 

    const logout = () => { // logout api request
        axios.post('/api/user/logout').then(res => setLogin(loginStateParam.LoggedOut)
        ).catch(err => console.log(err));
    };
    props.children.props = {loginstate: loginState};

    return (
        <div>
            <NavBar loginstate={loginState} logout={logout}/>
            {props.children(loginstate=loginState)}
        </div>   
    )
}

