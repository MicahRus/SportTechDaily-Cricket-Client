import React from "react";
import Nav from "react-bootstrap/Nav";
import { Redirect } from "react-router-dom";

class TabNav extends React.Component {
  state = { redirect: null };

  navBar = () => {
    return (
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              this.setState({ redirect: "/sportsbetting" });
            }}
          >
            Sports Betting
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            onClick={() => {
              this.setState({ redirect: "/fantasysport" });
            }}
              eventKey="link-1">Fantasy Sports</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              this.setState({ redirect: "/" });
            }}
            eventKey="link-1"
          >
            Sports Analytics
          </Nav.Link>
        </Nav.Item>
      </Nav>
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
