import NavBar from '../navbar';
import DropDownStatus from './dropdown';
import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button} from 'react-bootstrap';
import dateFormat from 'dateformat';
import loginStateParam from '../param';
import './css/job.css';

export default function Job() {
   
    const location = useLocation();
    const props = location.state[0];
    const navigate = useNavigate();
    const [state, setState] = useState({isOwner: false, isFavorite: false, status: ""}); 
    const [user, setUser] = useState('');
    const [loginState, setLogin] = useState(loginStateParam.Undefined); // store the login state

    if (loginState === loginStateParam.Undefined) { 
        const config = {headers: {'Content-Type': 'application/json','Cache-Control' : 'no-cache'}};
        axios.get('/api/user/loggedIn', config).then(res => { // check the login state with back server
            setLogin(loginStateParam.LoggedIn);
            setUser(res.data.username);
        }).catch((err) => setLogin(loginStateParam.LoggedOut))
        // set cache control -> no cache to always make a request
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
    
    let favoriteComponent = <i className="far fa-heart favorite-button" // unfavorite (logged out or unfavorite)
        onClick={getFavoriteFunction(props.id, 'favorite', state, setState, navigate)}></i>; 
    let dropDownStatus = null;
    let EditComponent = null;
    let DeleteComponent = null;
    if (loginState === loginStateParam.LoggedIn && state.isFavorite) {
        favoriteComponent = <i className="fas fa-heart favorite-button" // favorite (logged in and favorite)
        onClick={getFavoriteFunction(props.id, 'unfavorite', state, setState, navigate)}></i> 
        dropDownStatus = <DropDownStatus className='dropdown' jobId={props.id} status={state.status} state={state} setState={setState}/>;
    }
    if (loginState === loginStateParam.LoggedIn && state.isOwner) {
        EditComponent = <Button className='job-button' variant="primary" onClick= {editJob(props.id, navigate, props)}>Edit</Button>;
        DeleteComponent = <Button className='job-button' variant="danger" onClick={deleteJob(props.id, navigate)}>Delete</Button>;
    }

    let website = null;
    if (props.website) {
        website = props.website;
    }
    // conversion
    const date = dateFormat(props.postDate, 'fullDate');
    const styledDescription = props.description;
    const websiteText = website ? 'Go To Website' : 'No website provided';

    return (
        <div className='jobpage'>
            <NavBar loginstate={loginState} logout={logout} username={user}/>
            <h1>Job Details</h1>
            <div className='job-content'>
                <div>
                    <h2 className='job-title-detail'><i className="fas fa-chevron-right arrow"></i><strong>{props.title}{favoriteComponent}</strong></h2>
                    <div className='compnay-info'>
                        <span className='key-word'><i class="far fa-building company"></i>{props.company}</span> 
                        <span className='key-word'><i class="fas fa-map-marked-alt location"></i>{props.location}</span>
                    </div>
                </div>
                <hr></hr>
                <div className="content-part">
                    <span className='key-word'>Job Description: </span>
                    <div dangerouslySetInnerHTML={{__html: styledDescription}}></div>
                </div>
                <hr></hr>
                <div className="content-part">
                    <span className='key-word'>Company Website: </span><span><a href={website}>{websiteText}  </a></span>
                </div>
                <div className="content-part">
                    <span className='key-word'>Employer Contact: </span><span><a href={"mailto:" + props.email}>{props.email}</a></span>
                </div>
                <div className="content-part">
                    <span className='key-word'>Post Date: </span>{date}
                </div>
                <div className="content-part">
                    <span className='key-word'>Application Status: </span>{dropDownStatus}
                </div>
                <div className="button-group">
                    {DeleteComponent}
                    {EditComponent}
                </div>
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