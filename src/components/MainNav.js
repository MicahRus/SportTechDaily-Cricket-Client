import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";

class MainNav extends React.Component {
  navBar = () => {
    return (
      <Row>
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand href="/">DataHub</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="main-nav">
              <Nav.Link href="#sportsTechDaily">Sports Tech Daily</Nav.Link>
              <Nav.Link href="#anotherLink">Another Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
    );
  };
  render() {
    return this.navBar();
  }
}

export default MainNav;
