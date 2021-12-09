import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import loginStateParam from './param';

export default function NavBar(props) {

    const loginState = props.loginstate;

    let favoriteComponent = <Nav.Link href="/login">My Favorites</Nav.Link>;
    let loginComponent = <Nav.Link href="/login">Log In</Nav.Link>;
    let registerComponent = <Nav.Link href="/register">Sign Up</Nav.Link>
    let logoutComponent = null;
    let postComponent = null;

    // determine the buttons based on login state
    if (loginState === loginStateParam.LoggedIn) {
        favoriteComponent = <Nav.Link href="/favorite">My Favorites</Nav.Link>;
        loginComponent = null;
        registerComponent = null;
        postComponent = <Nav.Link href="/create">Post a Job</Nav.Link>;
        logoutComponent = <Nav.Link onClick={props.logout}>Log Out</Nav.Link>;
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/home">meetOffer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    {favoriteComponent}
                    {postComponent}
                    {logoutComponent}
                    {loginComponent}
                    {registerComponent}
                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}