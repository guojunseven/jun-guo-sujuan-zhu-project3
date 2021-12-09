import { ListGroup } from "react-bootstrap";
import Job from "./job";

export default function JobGroup(props) {
    if (props.jobs.length === 0) {
        return null;
    }
    const jobList = [];

    for (let job of props.jobs) {
        jobList.push(<Job id={job.id} title={job.title} company={job.company} location={job.location} />);
    }
    return (
        <ListGroup>
            <ListGroup.Item variant={props.type}>{props.groupName}</ListGroup.Item>
            <ListGroup.Item className='job-group'><div className="job-list">{jobList}</div></ListGroup.Item>
        </ListGroup>
    )
}