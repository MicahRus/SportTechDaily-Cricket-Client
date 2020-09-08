import React from "react";

import { Col, Container, Row } from "react-bootstrap";

import SelectTabs from "./SelectTabs";
import PlayerSelect from "./PlayerSelect";

import RenderRadar from "./RenderRadar";

class Home extends React.Component {
  state = {
    loaded: false,
    graphType: "radar",
  };

  componentDidMount() {
    this.getPlayerStats();
    this.getAllData();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  getAllData = async () => {
    const data = await Promise.all([this.getPlayers(), this.getPlayerStats()]);
    console.log(data);
    this.setState({ allPlayersData: data[0], allPlayersStats: data[1] }, () => {
      this.setLoaded();
    });
  };

  // This function sets the state of loaded to true, which will then allow the page to load with populated data. This will be ran last after all the fetch requests have been made
  setLoaded = () => {
    this.setState({ loaded: true });
  };

  getPlayerStats = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/players/stats`
    );
    const data = await response.json();
    return data.rows;
  };

  getPlayers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/players`
    );
    const data = await response.json();
    return data.rows;
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
        <PlayerSelect options={this.state.allPlayersData} />
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
          <h1> Page Loading</h1>
        </Container>
      );
    }
  }
}

export default Home;
