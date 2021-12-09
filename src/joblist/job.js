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
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div>
                                <h2>{title}</h2>
                            </div>
                            <span>{company}</span>
                            <div>
                                {location}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}