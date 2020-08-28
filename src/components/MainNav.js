import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { Redirect } from "react-router-dom";

import logo from "./logo.svg";

class MainNav extends React.Component {
  state = { redirect: null };
  navBar = () => {
    return (
      <Row>
        <Container style={{ paddingBottom: "15px" }}>
          <Navbar variant="light" collapseOnSelect expand="lg">
            <Navbar.Brand href="https://sporttechdaily.com/">
              <img
                src={logo}
                width="130"
                height="50"
                className="d-inline-block align-top"
                alt="Sport Tech Daily Logo  "
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav variant="tabs" className="main-nav">
                <Nav justify variant="tabs" defaultActiveKey="/">
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => {
                        this.setState({ redirect: "/" });
                      }}
                      eventKey="/"
                    >
                      Sports Analytics
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => {
                        this.setState({ redirect: "/fantasysport" });
                      }}
                      eventKey="/fantasysport"
                    >
                      Fantasy Sports
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => {
                        this.setState({ redirect: "/sportsbetting" });
                      }}
                      eventKey="/sportsbetting"
                    >
                      Sports Betting
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </Row>
    );
  };
  render() {
    if (this.state.redirect) {
      return (
        <>
          <Redirect push to={this.state.redirect} />
          {this.navBar()}
        </>
      );
    }
    return this.navBar();
  }
}

export default MainNav;
