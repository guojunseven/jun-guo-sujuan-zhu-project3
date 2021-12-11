import Alert from '../alert';
import JobGroup from './jobGroup';
import NavBar from '../navbar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import loginStateParam from '../param';
import config from '../param';
import axios from 'axios';
import './css/favorite.css';

export default function Favorite() {

    const navigate = useNavigate();
    const [loginState, setLogin] = useState(loginStateParam.Undefined); // store the login state
    const [jobs, setData] = useState();
    const [user, setUser] = useState('');
    const[alert, setAlert] = useState({msg: '', type: 'warning'});

    if (loginState === loginStateParam.Undefined) { 
        axios.get('/api/user/loggedIn', config).then(res => { // check the login state with back server
            setLogin(loginStateParam.LoggedIn);
            setUser(res.data.username);
        }).catch((err) => setLogin(loginStateParam.LoggedOut))
        // set cache control -> no cache to always make a request
        axios.get('/api/job/getFavorites', config).then(res => {
            if (! checkFavorites(res.data)) {
                setAlert({type: 'info', msg: "Opps! No Results. Try to add some jobs!"});
            } else {
                setData(res.data);
            }
        }).catch(err => navigate('/login'));
    } else if (loginState === loginStateParam.LoggedOut) {
        navigate('/login');
    }

    const logout = () => { // logout api request
        axios.post('/api/user/logout').then(res => navigate('/login')
        ).catch(err => console.log(err));
    };
    
    const content = constructJobLists(jobs);
    return (
        <div className='favoritepage'>
            <NavBar loginstate={loginState} logout={logout} username={user}/>
            <h1 class='search-title'>{user}'s favorite jobs</h1>
            <hr></hr>
            <Alert msg={alert.msg} type={alert.type} setAlert={setAlert}/>
            {content}
        </div>
    )
}

function constructJobLists(jobGroups) {
    if (! jobGroups) {
        return null;
    }
    const NotStart = <JobGroup jobs={jobGroups["Not Started"]} groupName="Not Started" type="secondary"></JobGroup>;
    const Applied = <JobGroup jobs={jobGroups["Applied"]} groupName="Applied" type="primary"></JobGroup>;
    const Interview = <JobGroup jobs={jobGroups["Interview Scheduled"]} groupName="Interview Scheduled" type="info"></JobGroup>;
    const Accepted = <JobGroup jobs={jobGroups["Accepted"]} groupName="Accepted" type="success"></JobGroup>;
    const Rejected = <JobGroup jobs={jobGroups["Rejected"]} groupName="Rejected" type="danger"></JobGroup>;

    return (
        <div className="group-list"> 
            {NotStart}
            {Applied}
            {Interview}
            {Accepted}
            {Rejected}
        </div>
    )
}

function checkFavorites(jobGroups) {
    for (let group in jobGroups) {
        if (jobGroups[group].length > 0) {
            return true;
        }
    }
    return false;
}