import React from "react";

import { Col, Container, Row } from "react-bootstrap";

import SelectTabs from "./SelectTabs";
import RenderRadar from "./RenderRadar";

class Home extends React.Component {
  state = {
    loaded: false,
    graphType: "radar",
  };
  componentDidMount() {
    this.getData();

    this.setLoaded();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  setLoaded = () => {
    this.setState({ loaded: true });
  };

  getPlayers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/players`
    );
    const data = await response.json();
    this.setState({ data: data.rows });
    console.log(data);
  };

  renderControls = () => {
    return (
      <Col sm={12} lg={4} md={4} xl={4} id="control-tabs">
        <SelectTabs
          graphType={this.state.graphType}
          action={(e) => {
            if (this.state.graphType !== e) this.setState({ graphType: e });
          }}
        />
      </Col>
    );
  };

  render() {
    if (this.state.loaded) {
      return (
        <Row>
          {this.renderControls()}
          <RenderRadar />
        </Row>
      );
    } else {
      return (
        <Container>
          <h1> ZZZZZZZZZZ</h1>;
        </Container>
      );
    }
  }
}

export default Home;
