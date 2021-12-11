import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/job.css';

export default function Job(props) {
    
    const {title, company, location, id} = props
    const navigate = useNavigate();

    const click = () => {
        axios.get('/api/job/findJobDetail/' + id).then(results => navigate('/job/' + id, {state: results.data})
        ).catch(err => console.log(err.response.data));
    }

    return (
        <div className='jobCard' onClick={click}>
            
            <div>
                <h3 className='job-title'><i className="fas fa-chevron-right arrow"></i>{title}</h3>
            </div>
            <span><h4><i class="far fa-building company"></i>{company}</h4></span>
            <div>
                <h4><i class="fas fa-map-marked-alt location"></i>{location}</h4>
            </div>
                      
        </div>
    )
}