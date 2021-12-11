import NavBar from '../navbar';
import Job from './job';
import Alert from '../alert';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import loginStateParam from '../param';
import './css/search.css';

export default function Search(props) {
    
    const location = useLocation();
    const title = location.state;
    const [jobs, setData] = useState([]);
    const [loginState, setLogin] = useState(loginStateParam.Undefined); // store the login state
    const [user, setUser] = useState('');
    const[alert, setAlert] = useState({msg: '', type: 'warning'});

    if (loginState === loginStateParam.Undefined) { 
        axios.get('/api/user/loggedIn').then(res => { // check the login state with back server
            setLogin(loginStateParam.LoggedIn);
            setUser(res.data.username);
        }).catch((err) => setLogin(loginStateParam.LoggedOut))
        axios.get("/api/job/search/" + title).then(res => 
            {
                if (res.data.length === 0) {
                    setAlert({type: 'info', msg: "Opps! No Results. Try to add some jobs!"});
                } else {
                    setData(res.data);
                }
            }
        ).catch(err => setAlert({type: 'warning', msg:"Must provide a valid job title for searching"}));
    }

    const logout = () => { // logout api request
        axios.post('/api/user/logout').then(res => setLogin(loginStateParam.LoggedOut)
        ).catch(err => console.log(err));
    };

    const jobComponent = [];

    for (let job of jobs) {
        jobComponent.push(<Job id={job.id} title={job.title} company={job.company} location={job.location} />);
    }

    return (
       <div className='searchpage'>
            <NavBar loginstate={loginState} logout={logout} username={user}/>
            <Alert msg={alert.msg} type={alert.type} setAlert={setAlert}/>
            <h1 className='search-title'>Search results for '{title}'</h1>
            <hr></hr>
            <div className='search-content'>
                <div className="job-list"> 
                    {jobComponent}
                </div>
            </div>
       </div>
    )
}