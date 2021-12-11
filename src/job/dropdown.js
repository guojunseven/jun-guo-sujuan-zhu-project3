import axios from 'axios';
import { Dropdown, Button } from 'react-bootstrap';

export default function DropDownStauts(props) {
    
    const jobId = props.jobId;
    const setState = props.setState;

    const setSelect = (newStatus) => {
        axios.put('/api/job/changeStatus/' + jobId, {status: newStatus}
        ).then(res => setState({...props.state, status: newStatus})
        ).catch(err => console.log("something went wrong:" + err));
    }

    return (
        <Dropdown onSelect={setSelect}>
            <Button size='lg' className='job-button' variant="success">{props.status}</Button>
            <Dropdown.Toggle split className='job-button' variant="success" id="dropdown-split-basic" />
            <Dropdown.Menu>
                <Dropdown.Item eventKey='Not Started'>Not Started</Dropdown.Item>
                <Dropdown.Item eventKey='Applied'>Applied</Dropdown.Item>
                <Dropdown.Item eventKey='Interview Scheduled'>Interview Scheduled</Dropdown.Item>
                <Dropdown.Item eventKey='Accepted'>Accepted</Dropdown.Item>
                <Dropdown.Item eventKey='Rejected'>Rejected</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}