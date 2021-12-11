import { Navbar, Container, Nav, ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap';
import loginStateParam from './param';
import './css/navbar.css';

export default function NavBar(props) {

    const loginState = props.loginstate;

    let favoriteComponent = <Nav.Link href="/login">My Favorites</Nav.Link>;
    let loginComponent = <Nav.Link href="/login">Log In</Nav.Link>;
    let registerComponent = <Nav.Link href="/register">Sign Up</Nav.Link>
    let logoutComponent = null;
    let postComponent = null;
    let userComponent = null;

    // determine the buttons based on login state
    if (loginState === loginStateParam.LoggedIn) {
        favoriteComponent = <Nav.Link href="/favorite">My Favorites</Nav.Link>;
        loginComponent = null;
        registerComponent = null;
        postComponent = <Nav.Link href="/create">Post a Job</Nav.Link>;
        logoutComponent = <Nav.Link onClick={props.logout}>Log Out</Nav.Link>;
        userComponent = <DropdownButton title={props.username} id="bg-nested-dropdown">
                            <Dropdown.Item eventKey="1">Setting</Dropdown.Item>
                        </DropdownButton>
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/home" className='brand'>meetOffer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/home" className='nav-link'>Home</Nav.Link>
                    {favoriteComponent}
                    {postComponent}
                </Nav>
                <ButtonGroup className='userGroup'>
                        {loginComponent}
                        {registerComponent}
                        {logoutComponent}
                        {userComponent}
                </ButtonGroup>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}