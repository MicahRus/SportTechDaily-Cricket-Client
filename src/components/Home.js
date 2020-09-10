import React from "react";

import { Col, Container, Row } from "react-bootstrap";

import SelectTabs from "./SelectTabs";
import PlayerSelect from "./PlayerSelect";

import RenderRadar from "./RenderRadar";

class Home extends React.Component {
  state = {
    loaded: false,
    graphType: "radar",
    playerType: "batsman",
  };

  componentDidMount() {
    this.getAllData();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  // This function will get all the promises from the different fetch requests and push them into state
  getAllData = async () => {
    const data = await Promise.all([
      this.getAllPlayers(),
      this.getAllPlayerStats(),
      this.getAllBatsmen(),
      this.getAllBowlers(),
      this.getAllAllRounders(),
      this.getAllWicketKeepers(),
    ]);

    this.setState(
      {
        allPlayersData: data[0],
        allPlayersStats: data[1],
        allBatsmen: data[2],
        allBowlers: data[3],
        allAllRounders: data[4],
        getAllWicketKeepers: data[5],
      },
      () => {
        // This function will load the actual page instead of the skeleton
        this.setLoaded();
      }
    );
  };

  getAllPlayerStats = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/players/stats`
      );
      const data = await response.json();
      return data.rows;
    } catch (err) {
      this.setState({ failedFetch: true });
      alert(
        "Sorry, something went wrong when trying to communicate with the database"
      );
    }
  };

  getAllPlayers = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/players`
      );
      const data = await response.json();
      return data.rows;
    } catch (err) {
      this.setState({ failedFetch: true });
      alert(
        "Sorry, something went wrong when trying to communicate with the database"
      );
    }
  };

  getAllBatsmen = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/players/batsmen`
      );
      const data = await response.json();
      return data.rows;
    } catch (err) {
      this.setState({ failedFetch: true });
      alert(
        "Sorry, something went wrong when trying to communicate with the database"
      );
    }
  };

  getAllBowlers = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/players/bowlers`
      );
      const data = await response.json();
      return data.rows;
    } catch (err) {
      this.setState({ failedFetch: true });
      alert(
        "Sorry, something went wrong when trying to communicate with the database"
      );
    }
  };

  getAllAllRounders = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/players/all_rounders`
      );
      const data = await response.json();
      return data.rows;
    } catch (err) {
      this.setState({ failedFetch: true });
      alert(
        "Sorry, something went wrong when trying to communicate with the database"
      );
    }
  };

  getAllWicketKeepers = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/players/wicket_keepers`
      );
      const data = await response.json();
      return data.rows;
    } catch (err) {
      this.setState({ failedFetch: true });
      alert(
        "Sorry, something went wrong when trying to communicate with the database"
      );
    }
  };

  // This function sets the state of loaded to true, which will then allow the page to load with populated data. This will be ran last after all the fetch requests have been made
  setLoaded = () => {
    this.setState({ loaded: true });
  };

  // A click handler for the 'player type' buttons
  playerTypeClickHandler = (value) => {
    this.setState({ playerType: value });
  };

  // This function renders all the controls for the graph
  renderControls = () => {
    return (
      <Col sm={12} lg={4} md={4} xl={4} id="control-tabs">
        <SelectTabs
          graphType={this.state.graphType}
          action={(e) => {
            if (this.state.graphType !== e) this.setState({ graphType: e });
          }}
        />
        <PlayerSelect
          clickHandler={this.playerTypeClickHandler}
          options={this.state}
        />
      </Col>
    );
  };

  render() {
    // Error catching logic to ensure data is loaded
    if (this.state.failedFetch) {
      return (
        <div>
          {" "}
          <h1> Oh no....</h1>
          <p>
            {" "}
            Sorry that something went wrong when trying to use our page, please
            report the bug to us and we'll get straight on fixing it.
          </p>
        </div>
      );
    }

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
