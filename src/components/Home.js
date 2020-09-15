import React from "react";

import { Col, Container, Row } from "react-bootstrap";

import SelectTabs from "./SelectTabs";
import PlayerSelect from "./PlayerSelect";
import Filters from "./Filters";

import RenderRadar from "./RenderRadar";

class Home extends React.Component {
  state = {
    loaded: false,
    graphType: "radar",
    playerType: "batsman",
    competition: ["domestic", "international"],
    selectedStats: ["Runs", "4s", "6s"],
  };

  componentDidMount() {
    if (localStorage.getItem("data")) {
      this.useStoredData();
    }
    this.getAllData();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  useStoredData = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    this.setDataToState(data);
  };

  // This function will get all the promises from the different fetch requests and push them into state
  getAllData = async () => {
    const data = await Promise.all([
      this.getAllPlayers(),
      this.getAllPlayerStats(),
      this.getAllBatsmen(),
      this.getAllBowlers(),
      this.getAllAllRounders(),
      this.getAllWicketKeepers(),
      this.getAllVenues(),
      this.getAllLeagues(),
      this.getPost2017Players(),
    ]);

    localStorage.setItem("data", JSON.stringify(data));

    // This function handles setting the fetched data into state
    this.setDataToState(data);
  };

  setDataToState = (data) => {
    this.setState(
      {
        allPlayersData: data[0],
        allPlayersStats: data[1],
        allBatsmen: data[2],
        allBowlers: data[3],
        allAllRounders: data[4],
        AllWicketKeepers: data[5],
        getAllWicketKeepers: data[5],
        allVenues: data[6],
        allLeagues: data[7],
        post2017Players: data[8],
      },
      () => {
        // This function will load the actual page instead of the skeleton
        this.setState({ loaded: true });
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
    }
  };

  getPost2017Players = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/players/post2017`
      );
      const data = await response.json();
      return data.rows;
    } catch (err) {
      this.setState({ failedFetch: true });
    }
  };

  getAllVenues = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/venues`
      );
      const data = await response.json();
      return data.rows;
    } catch (err) {
      this.setState({ failedFetch: true });
    }
  };

  getAllLeagues = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/leagues`
      );
      const data = await response.json();
      return data.rows;
    } catch (err) {
      this.setState({ failedFetch: true });
    }
  };

  // A click handler for the 'player type' buttons
  playerTypeClickHandler = (value) => {
    this.setState({ playerType: value });
  };

  competitionClickHandler = (e) => {
    let key = e.target.value;

    if (this.state.competition.includes(key)) {
      if (this.state.competition.length >= 2) {
        this.setState((prevState) => ({
          competition: prevState.competition.filter((x) => x !== key),
        }));
      } else {
        alert("You must have at least 1 selected competition selected");
      }
    } else {
      this.setState((prevState) => ({
        competition: [...prevState.competition, key],
      }));
    }
  };

  playerSelectClickHandler = (selectedPlayer, e) => {
    this.setState({ [selectedPlayer]: e });
  };

  statCheckboxClickHandler = (e) => {
    const key = e.target.id;

    if (this.state.selectedStats.includes(key)) {
      if (this.state.selectedStats.length >= 4) {
        this.setState((prevState) => ({
          selectedStats: prevState.selectedStats.filter((x) => x !== key),
        }));
      } else {
        alert("You must have at least 3 stats selected");
      }
    } else {
      this.setState((prevState) => ({
        selectedStats: [...prevState.selectedStats, key],
      }));
    }
  };

  playerTemplateClickHandler = (e) => {
    let key = e.target.innerHTML;
    console.log(key);

    switch (key) {
      default:
        console.log("defaulted");
        break;

      case "Batsman":
        this.setState({
          selectedStats: [
            "Runs",
            "Batting Average",
            "Batting Strike Rate",
            "4s",
            "6s",
            "Balls Per Boundary",
            "Power Play Strike Rate",
            "Death Strike Rate",
            "Dot Ball Percentage",
          ],
        });
        break;

      case "Bowler":
        this.setState({
          selectedStats: [
            "Wickets",
            "Bowling Average",
            "Bowling Economy Rate",
            "Catches",
            "Dot Ball Percentage",
            "Power Play Economy Rate",
            "Death Overs Economy Rate",
          ],
        });
        break;

      case "Wicket Keeper":
        this.setState({
          selectedStats: [
            "Catches",
            "Stumpings",
            "Run Outs",
            "Runs",
            "Batting Average",
            "Batting Strike Rate",
            "4s",
            "6s",
            "Balls Per Boundary",
            "Power Play Strike Rate",
            "Death Strike Rate",
            "Dot Ball Percentage",
          ],
        });
        break;

      case "All Rounder":
        this.setState({
          selectedStats: [
            "Runs",
            "Batting Average",
            "Batting Strike Rate",
            "Wickets",
            "Bowling Average",
            "Bowling Economy Rate",
            "Catches",
            "4s",
            "6s",
            "Balls Per Boundary",
            "Power Play Strike Rate",
            "Death Strike Rate",
            "Dot Ball Percentage",
          ],
        });
        break;
    }
  };

  leagueClickHandler = (leagues) => {
    console.log(leagues);
    this.setState({ selectedLeagues: leagues });
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
          playerSelectClickHandler={this.playerSelectClickHandler}
        />
        <Filters
          leagues={this.state.allLeagues}
          venues={this.state.allVenues}
          competition={this.state.competition}
          selectedStats={this.state.selectedStats}
          competitionClickHandler={this.competitionClickHandler}
          statCheckboxClickHandler={this.statCheckboxClickHandler}
          playerTemplateClickHandler={this.playerTemplateClickHandler}
          leagueClickHandler={this.leagueClickHandler}
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
