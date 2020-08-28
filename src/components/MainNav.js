import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import logo from "./logo.svg";

class MainNav extends React.Component {
  navBar = () => {
    return (
      <Row>
        <Navbar
          bg="dark"
          variant="dark"
          collapseOnSelect
          expand="lg"
          style={{ width: "100vw" }}
        >
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="130"
              height="60"
              className="d-inline-block align-top"
              alt="Sport Tech Daily Logo  "
            />
          </Navbar.Brand>
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
