import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { Redirect } from "react-router-dom";

class TabNav extends React.Component {
  state = { redirect: null };

  navBar = () => {
    return (
      <Row>
        <Col>
          <Nav
            style={{
              paddingBottom: "25px",
              marginBottom: "10px",
            }}
            justify
            variant="tabs"
            defaultActiveKey="/"
          >
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
        </Col>
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

export default TabNav;
