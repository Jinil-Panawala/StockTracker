import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function NavBar() {

    return (
        <Navbar expand="md" /*lg*/ className="bg-body-tertiary " bg='dark' data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="home" >Stock Scouter</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className='flex-grow-1 justify-content-evenly '>

                    <Nav.Link href="findstocks" className='mr-10'>Find Stocks</Nav.Link>
                    <Nav.Link href="watchlist">My Watchlist</Nav.Link>
                </Nav>
                
                <Nav className='justify-content-end'>

                    <Nav.Link href="login" >Login</Nav.Link>
                </Nav>
                
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );






}