import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom'

export default function NavBar() {

    return (
        <Navbar expand="md" /*lg*/ className="bg-body-tertiary " bg='dark' data-bs-theme="dark" /*style={{position: 'fixed', width: '100%'}}*/>
          <Container>
            <Navbar.Brand as={NavLink} to='/'> Stock Scouter</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className='flex-grow-1 justify-content-evenly '>

                    <Nav.Link as={NavLink} to="/" className='mr-2'>Find Stocks</Nav.Link>
                    <Nav.Link as={NavLink} to="/watchlist">My Watchlist</Nav.Link>
                </Nav>
                
                <Nav className='justify-content-end'>

                    <Nav.Link as={NavLink} to="login" >Login</Nav.Link>
                </Nav>
                
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );






}