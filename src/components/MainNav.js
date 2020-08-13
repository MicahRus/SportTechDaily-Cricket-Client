import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'


const MainNav = () => {
    return(
        <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand href="/datahub">DataHub</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="main-nav">
                <Nav.Link href="#sportsTechDaily">Sports Tech Daily</Nav.Link>
                <Nav.Link href="#anotherLink">Another Link</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default MainNav