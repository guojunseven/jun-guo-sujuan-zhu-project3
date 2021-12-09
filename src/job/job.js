import NavBar from '../navbar';
import DropDownStatus from './dropdown';
import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import dateFormat from 'dateformat';
import loginStateParam from '../param';
import './css/job.css';

export default function Job() {
   
    const location = useLocation();
    const props = location.state[0];
    const navigate = useNavigate();
    const [state, setState] = useState({isOwner: false, isFavorite: false, status: ""}); 
    const [loginState, setLogin] = useState(loginStateParam.Undefined); // store the login state

    if (loginState === loginStateParam.Undefined) { 
        axios.get('/api/user/loggedIn').then(res => { // check the login state with back server
            setLogin(loginStateParam.LoggedIn);
        }).catch((err) => setLogin(loginStateParam.LoggedOut))
        // set cache control -> no cache to always make a request
        const config = {headers: {'Content-Type': 'application/json','Cache-Control' : 'no-cache'}};
        axios.get('/api/job/isOwner/' + props.id, config).then(res => {
            const newState = {isFavorite: res.data.isFavorite, 
                              isOwner: res.data.isOwner, 
                              status: res.data.status};
            setState(newState);   
        }).catch(err => console.log(err));
    } 
    
    const logout = () => { // logout api request
        axios.post('/api/user/logout').then(res => setLogin(loginStateParam.LoggedOut)
        ).catch(err => console.log(err));
    };
    
    let favoriteComponent = <i className="far fa-heart" // unfavorite (logged out or unfavorite)
        onClick={getFavoriteFunction(props.id, 'favorite', state, setState, navigate)}></i>; 
    let dropDownStatus = null;
    let EditComponent = null;
    let DeleteComponent = null;
    if (loginState === loginStateParam.LoggedIn && state.isFavorite) {
        favoriteComponent = <i className="fas fa-heart" // favorite (logged in and favorite)
        onClick={getFavoriteFunction(props.id, 'unfavorite', state, setState, navigate)}></i> 
        dropDownStatus = <DropDownStatus id={props.id} status={state.status} state={state} setState={setState}/>;
    }
    if (loginState === loginStateParam.LoggedIn && state.isOwner) {
        EditComponent = <Button variant="primary" onClick= {editJob(props.id, navigate, props)}>Edit</Button>;
        DeleteComponent = <Button variant="danger" onClick={deleteJob(props.id, navigate)}>Delete</Button>;
    }

    let website = null;
    if (props.website) {
        website = props.website;
    }
    // conversion
    const date = dateFormat(props.postDate, 'fullDate');
    const styledDescription = props.description;

    return (
        <div className='jobpage'>
            <NavBar loginstate={loginState} logout={logout}/>
            <div className='job-content'>
                <div>
                    <h2>{props.title}</h2>
                    <span>{props.company}</span> <span>{props.location}</span> {favoriteComponent}
                    {dropDownStatus}
                </div>
                <div className="desc">
                    <h2>Job Description</h2>
                    <div dangerouslySetInnerHTML={{__html: styledDescription}}></div>
                </div>

                <div>
                    Company Website: <span><a href={website}>Go To Website</a></span>
                </div>
                <div>
                    Employer Contact: <span><a href={"mailto:" + props.email}>{props.email}</a></span>
                </div>
                <h3>{date}</h3>
                {DeleteComponent}
                {EditComponent}
            </div>
           
        </div>
    )
}

//generate onclick function based on the current state(favorite or unfavorite)
function getFavoriteFunction(jobId, action, state, setState, navigate) {
    function favorite() {
        axios.post(`/api/job/${action}/${jobId}`).then(res => {
            if (action === 'favorite') {
                setState({...state, isFavorite: true});
            } else {
                setState({...state, isFavorite: false});
            }
        }).catch(err => navigate('/login'));
    }
    return favorite;
}

//delete job based on job id
function deleteJob(jobId, navigate) {
    function deleteImpl() {
        axios.delete(`/api/job/delete/${jobId}`).then(res => navigate('/home')
        ).catch(err => console.log(err.response.data));
    }
    return deleteImpl;
}

//edit job based on job id
function editJob(jobId, navigate, props) {
    function editImpl() {
        navigate(`/edit/${props.id}`, {state: props})
    }
    return editImpl;
}