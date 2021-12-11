import NavBar from '../navbar';
import Alert from '../alert';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Editor, OriginalTools } from 'react-bootstrap-editor';
import loginStateParam from '../param';
import config from '../param';
import './css/jobInput.css';

export default function JobEdit() {

    const navigate = useNavigate();
    const location = useLocation();
    const props = location.state;
    const[loginState, setLogin] = useState(loginStateParam.Undefined);
    const [user, setUser] = useState('');
    const[data, setData] = useState(props); // fill the current job data
    const[alert, setAlert] = useState({msg: '', type: 'warning'});

    if (loginState === loginStateParam.Undefined) { 
        axios.get('/api/user/loggedIn', config).then(res => { // check the login state with back server
            setLogin(loginStateParam.LoggedIn);
            setUser(res.data.username);
        }).catch(err => navigate('/login'))
    } 

    const logout = () => { // logout api request
        axios.post('/api/user/logout').then(res => navigate('/login')
        ).catch(err => console.log(err));
    };
    
    const submit = () => {
        if (! checkFormData(data)) {
            setAlert({...alert, msg: 'Missing fields! Please check and submit again!'});
        } else {
            axios.put(`/api/job/edit/${props.id}`, data).then(res => navigate(`/job/${props.id}`, {state: [res.data]})
            ).catch(err => {console.log(err); setAlert({type: 'danger', msg: err.response.data})})
        }
    }

    return (
    <div className='inputpage'>
        <NavBar loginstate={loginState} logout={logout} username={user}/>
        <Alert type={alert.type} msg={alert.msg} setAlert={setAlert}/>
        <h1 className='input-title'>Edit a new job</h1>
        <div className='input-content'>
            <Form>
                <Form.Group className="mb-3 group">
                    <Form.Label className='key-word'>Job Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter job title" required
                    value={data.title} onChange={e => setData({...data, title: e.target.value})} />
                    <Form.Label className='key-word'>Company Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter company name" required 
                    value={data.company} onChange={e => setData({...data, company: e.target.value})} />
                    <Form.Label className='key-word'>Location</Form.Label>
                    <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control type="text" placeholder="Enter job location" required 
                        value={data.location} onChange={e => setData({...data, location: e.target.value})} />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3 group">
                    <Form.Label className='key-word'>Description</Form.Label>
                        <Editor
                            tools={OriginalTools}
                            value={data.description}
                            onChange={e => setData({...data, description: e})}
                        />
                </Form.Group>

                <Form.Group className="mb-3 group">
                    <Form.Label className='key-word'>Email Contact</Form.Label>
                    <Form.Control type="email" placeholder="For applicant to contact the company" required 
                    value={data.email} onChange={e => setData({...data, email: e.target.value})} />
                    <Form.Label className='key-word'>Company Website</Form.Label>
                    <Form.Control type="text" placeholder="Enter company website (optional)" 
                    value={data.website} onChange={e => setData({...data, website: e.target.value})} />
                </Form.Group>
                <Button variant="primary" className='input-button' onClick={submit}>
                    Submit
                </Button>
            </Form>
        </div>
    </div>
    )
}

function checkFormData(data) {
    return data.title && data.company && data.location && data.description && data.email;
}

