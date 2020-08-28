import React from "react";
import { Redirect } from "react-router-dom";

import {
  Form,
  Col,
  Row,
  Tab,
  Tabs,
  Button,
  Table,
  Container,
} from "react-bootstrap";

import Select from "react-select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ResponsiveRadar } from "@nivo/radar";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { ResponsiveBar } from "@nivo/bar";

import Popup from "reactjs-popup";

import { motion } from "framer-motion";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";

class Home extends React.Component {
  state = {
    visibility: null,
    averageOrTotal: "average",
    playerPercentiles: [{}, {}],
    scatterStat1: ["All Run Metres"],
    scatterStat2: ["Fantasy Points Total"],
    selectedStats: [
      "all_run_metres",
      "errors",
      "tries",
      "try_assists",
      "tackle_breaks",
      "line_breaks",
    ],
    stats: [{ kicks: 0 }, { passes: 0 }],
    barStat1: ["All Run Metres"],
    currentPlayers: [],
    checked: true,
    templateChecked: true,
    selectedPlayers: [
      { value: "500663", label: "James Tedesco" },
      { value: "504870", label: "Kalyn Ponga" },
    ],
    value: 5,
    players: [],
    graphType: "radar",
    redirect: null,
    showPositionButtons: false,
    hide: true,
    startDate: { date: Date.now() },
    endDate: { date: new Date() },
    disabled: false,
    fanType: "general",
    playerOrTeam: "player",
    teams: ["test"],
    toggleAdvancedOptions: false,
    barGraphData: [
      { playerName: "James Tedesco", all_run_metres: 96 },
      { playerName: "Kalyn Ponga", all_run_metres: 68 },
    ],
    currentPlayersData: {
      player1: { data: null, playerName: "player1" },
      player2: { data: null, playerName: "player2" },
    },
    graphData: [
      {
        stat: "all_run_metres",
        player1: 51,
        player2: 80,
      },
      {
        stat: "errors",
        player1: 99,
        player2: 75,
      },
      {
        stat: "line_breaks",
        player1: 99,
        player2: 75,
      },
      {
        stat: "tries",
        player1: 99,
        player2: 75,
      },
      {
        stat: "tackle_breaks",
        player1: 99,
        player2: 75,
      },
      {
        stat: "try_assists",
        player1: 99,
        player2: 75,
      },
    ],
    options: [
      { label: "All Run Metres", value: "All Run Metres" },
      { label: "Conversions", value: "Conversions" },
      { label: "Errors", value: "Errors" },
      { label: "Fantasy Points Total", value: "Fantasy Points Total" },
      { label: "Field Goals", value: "Field Goals" },
      { label: "Intercepts", value: "Intercepts" },
      { label: "Kick Metres", value: "Kick Metres" },
      { label: "Line Break Assists", value: "Line Break Assists" },
      { label: "Line Breaks", value: "Line Breaks" },
      { label: "Minutes Played", value: "Minutes Played" },
      { label: "Missed Tackles", value: "Missed Tackles" },
      { label: "Offloads", value: "Offloads" },
      { label: "One On One Steal", value: "One On One Steal" },
      { label: "Post Contact Metres", value: "Post Contact Metres" },
      { label: "Tackle Breaks", value: "Tackle Breaks" },
      { label: "Tackle Efficiency", value: "Tackle Efficiency" },
      { label: "Tackles Made", value: "Tackles Made" },
      { label: "Tries", value: "Tries" },
      { label: "Try Assists", value: "Try Assists" },
    ],
  };

  componentDidMount() {
    this.getAllPlayersData();
    this.getAllTeamsData();
    this.getCurrentPlayers();
    this.getPlayerPercentiles();
    this.getCurrentStats();
    this.getPlayerAveragePercentiles();

    if (this.state.refreshBarChart) {
      this.setBarChartData(this.state.selectedPlayers);
    }
  }

  getPlayerAveragePercentiles = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/average_percentiles`
    );
    const data = await response.json();
    console.log(data.rows);
    this.setState({ averagePlayerPercentiles: data.rows });
  };

  getPlayerPercentiles = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/percentiles`
    );
    const data = await response.json();
    this.setState({ playerPercentiles: data.rows });
  };

  getCurrentStats = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/currentstats`
    );
    const data = await response.json();
    console.log(data.rows);
  };

  getMatches = async (playerId, playerName, playerNumber) => {
    let playerId1 = playerId;
    let playerId2 = null;
    let selectedPlayers = JSON.parse(
      JSON.stringify(this.state.selectedPlayers)
    );

    if (playerNumber === "player1") {
      playerId2 = this.state.selectedPlayers[1].value;
      selectedPlayers[0].value = playerId;
      selectedPlayers[0].label = playerName;
    } else {
      playerId2 = this.state.selectedPlayers[0].value;
      selectedPlayers[1].value = playerId;
      selectedPlayers[1].label = playerName;
    }

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/matches?playerId1=${playerId1}&playerId2=${playerId2}`
    );
    const data = await response.json();
    let player1Matches = [];
    let player2Matches = [];
    data.rows.map((match) => {
      if (match.player_id === playerId1) {
        player1Matches.push(match);
      } else {
        player2Matches.push(match);
      }
    });

    this.setState({ player1Matches, player2Matches, selectedPlayers });
    this.setScatterChartData();
  };

  getAllPlayersData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/players`
    );
    const data = await response.json();
    this.setState({ players: data.rows });
  };

  getCurrentPlayers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/currentplayers`
    );
    const data = await response.json();

    this.setState({
      currentPlayers: data.rows,
    });

    this.setStats();
    this.getMatches("500663", "James Tedesco", "player1");
    this.getMatches("504870", "Kalyn Ponga", "player2");
  };

  // Pushes all the stats from the player data into an array, and then sets it to state.
  setStats = () => {
    const stats = [
      "all_run_metres",
      "conversions",
      "errors",
      "fantasy_points_total",
      "field_goals",
      "intercepts",
      "kick_metres",
      "line_break_assists",
      "line_breaks",
      "minutes_played",
      "missed_tackles",
      "offloads",
      "one_on_one_steal",
      "post_contact_metres",
      "tackle_breaks",
      "tackle_efficiency",
      "tackles_made",
      "tries",
      "try_assists",
    ];

    let all_run_metres = [];
    let conversions = [];
    let errors = [];
    let fantasy_points_total = [];
    let field_goals = [];
    let intercepts = [];
    let kick_metres = [];
    let line_break_assists = [];
    let line_breaks = [];
    let minutes_played = [];
    let missed_tackles = [];
    let offloads = [];
    let one_on_one_steal = [];
    let post_contact_metres = [];
    let tackle_breaks = [];
    let tackle_efficiency = [];
    let tackles_made = [];
    let tries = [];
    let try_assists = [];
    this.state.currentPlayers.map((player) => {
      stats.map((stat) => {
        switch (stat) {
          default:
            all_run_metres.push(player[stat]);
            break;
          case "conversions":
            conversions.push(player[stat]);
            break;
          case "errors":
            errors.push(player[stat]);
            break;
          case "fantasy_points_total":
            fantasy_points_total.push(player[stat]);
            break;
          case "field_goals":
            field_goals.push(player[stat]);
            break;
          case "intercepts":
            intercepts.push(player[stat]);
            break;
          case "kick_metres":
            kick_metres.push(player[stat]);
            break;
          case "line_break_assists":
            line_break_assists.push(player[stat]);
            break;
          case "line_breaks":
            line_breaks.push(player[stat]);
            break;
          case "minutes_played":
            minutes_played.push(player[stat]);
            break;
          case "missed_tackles":
            missed_tackles.push(player[stat]);
            break;
          case "offloads":
            offloads.push(player[stat]);
            break;
          case "one_on_one_steal":
            one_on_one_steal.push(player[stat]);
            break;
          case "post_contact_metres":
            post_contact_metres.push(player[stat]);
            break;
          case "tackle_breaks":
            tackle_breaks.push(player[stat]);
            break;
          case "tackle_efficiency":
            tackle_efficiency.push(player[stat]);
            break;
          case "tackles_made":
            tackles_made.push(player[stat]);
            break;
          case "tries":
            tries.push(player[stat]);
            break;
          case "try_assists":
            try_assists.push(player[stat]);
            break;
        }
      });
    });
    const allStats = [
      { all_run_metres },
      { conversions },
      { errors },
      { fantasy_points_total },
      { field_goals },
      { intercepts },
      { kick_metres },
      { line_break_assists },
      { line_breaks },
      { minutes_played },
      { missed_tackles },
      { offloads },
      { one_on_one_steal },
      { post_contact_metres },
      { tackle_breaks },
      { tackle_efficiency },
      { tackles_made },
      { tries },
      { try_assists },
    ];
    this.setState({ stats: allStats });

    // This will get the 2 'Template players' we want to display
    this.getPlayerData("500663", "James Tedesco", "player1");
    this.getPlayerData("504870", "Kalyn Ponga", "player2");
  };

  // Retrieves individual player data from the database
  getPlayerData = async (playerId, playerName, playerNumber) => {
    playerId = parseInt(playerId);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/player/id?playerId=${playerId}`
    );
    const data = await response.json();

    // Sets the state if the player number is 1
    if (playerNumber === "player1") {
      let player2 = this.state.currentPlayersData.player2;
      this.setState({
        currentPlayersData: {
          player1: { data: data.rows, playerName: playerName },
          player2: { data: player2.data, playerName: player2.playerName },
        },
      });
    }

    // Sets the state if the player number is 2
    if (playerNumber === "player2") {
      let player1 = this.state.currentPlayersData.player1;
      this.setState({
        currentPlayersData: {
          player1: { data: player1.data, playerName: player1.playerName },
          player2: { data: data.rows, playerName: playerName },
        },
      });
    }

    this.setGraphData(playerName, playerNumber);
  };

  getAllTeamsData = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/teams`);
    const data = await response.json();
    this.setState({ teams: data.rows });
  };

  componentDidUpdate() {
    console.log(this.state);
    if (this.state.refreshBarChart) {
      this.setBarChartData(this.state.selectedPlayers);
    }
  }

  handleRefresh = () => {
    if (this.state.getNewPlayer1Data) {
      this.setGraphData(
        [this.state.currentPlayersData.player1.playerName],
        "player1"
      );
      this.setState({ getNewPlayer1Data: false, getNewPlayer2Data: true });
    }
    if (this.state.getNewPlayer2Data) {
      this.setGraphData(
        [this.state.currentPlayersData.player2.playerName],
        "player2"
      );
      this.setState({ getNewPlayer2Data: false });
    }

    if (!this.state.getNewPlayer1Data && !this.state.getNewPlayer2Data) {
      this.setState({ redirect: null });
    }
  };

  // This function handles setting up the data that the graph will display
  setGraphData = (playerName, playerNumber) => {
    const player = this.state.currentPlayersData?.[playerNumber];

    // A function used to find the percentile of our players data
    const percentileFinder = (arr, val) =>
      (100 *
        arr.reduce(
          (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
          0
        )) /
      arr.length;

    let newData = [];
    let x = null;

    // A function that will select the stats being compared and then find the percentile of them and pass that data to state
    this.state.selectedStats.map((stat, i) => {
      let keys = Object.keys(this.state.graphData[i]);
      let values = Object.values(this.state.graphData[i]);
      // let values = [this.state.graphData[i].stat];
      values[0] = values[0].split(" ").join("_").toLowerCase();
      // Selects the stat which is being compared
      switch (values[0]) {
        default:
          x = 0;
          break;
        case "conversions":
          x = 1;
          break;
        case "errors":
          x = 2;
          break;
        case "fantasy_points_total":
          x = 3;
          break;
        case "field_goals":
          x = 4;
          break;
        case "intercepts":
          x = 5;
          break;
        case "kick_metres":
          x = 6;
          break;
        case "line_break_assists":
          x = 7;
          break;
        case "line_breaks":
          x = 8;
          break;
        case "minutes_played":
          x = 9;
          break;
        case "missed_tackles":
          x = 10;
          break;
        case "offloads":
          x = 11;
          break;
        case "one_on_one_steal":
          x = 12;
          break;
        case "post_contact_metres":
          x = 13;
          break;
        case "tackle_breaks":
          x = 14;
          break;
        case "tackle_efficiency":
          x = 15;
          break;
        case "tackles_made":
          x = 16;
          break;
        case "tries":
          x = 17;
          break;
        case "try_assists":
          x = 18;
          break;
      }

      // Sets an array that will be passed to the percentile based off the stats selected
      let array = this.state.stats[x][values[0]];

      array.sort((a, b) => a - b);
      array = [...new Set(array)];

      // Finds the percentile based off the array and player stat passed in
      let percentile = percentileFinder(array, player.data[0][stat]);
      percentile = Math.round(percentile);

      if (this.state.averageOrTotal === "total") {
        // Checks which player is selected
        if (playerNumber === "player1") {
          newData.push({
            stat: this.state.options[x].label,
            [playerName]: percentile,
            [keys[2]]: values[2],
          });
        } else {
          newData.push({
            stat: this.state.options[x].label,
            [keys[1]]: values[1],
            [playerName]: percentile,
          });
        }
      } else {
        let playerStat = 1;
        this.state.averagePlayerPercentiles.map((player) => {
          if (
            player.player_name === playerName[0] ||
            player.player_name === playerName
          ) {
            playerStat =
              player[
                this.state.options[x].label.toLowerCase().split(" ").join("_")
              ];
          }
        });
        if (playerNumber === "player1") {
          newData.push({
            stat: this.state.options[x].label,
            [playerName]: playerStat,
            [keys[2]]: values[2],
          });
        } else {
          newData.push({
            stat: this.state.options[x].label,
            [keys[1]]: values[1],
            [playerName]: playerStat,
          });
        }
      }
    });
    this.setState({ graphData: newData, redirect: "/" });
  };

  toggleAdvancedOptions = () => {
    this.setState({
      toggleAdvancedOptions: !this.state.toggleAdvancedOptions,
    });
  };

  playerButtonSelectHandler1 = (event) => {
    let playerId = event.value;
    let playerName = event.label;
    let playerNumber = "player1";
    if (this.state.graphType === "scatter") {
      this.getMatches(playerId, playerName, playerNumber);
    } else {
      this.getPlayerData(playerId, playerName, playerNumber);
    }
  };

  playerButtonSelectHandler2 = (event) => {
    let playerId = event.value;
    let playerName = event.label;
    let playerNumber = "player2";

    if (this.state.graphType === "scatter") {
      this.getMatches(playerId, playerName, playerNumber);
    } else {
      this.getPlayerData(playerId, playerName, playerNumber);
    }
  };

  statCheckBoxChangeHandler = (event) => {
    let key = event.target.id;

    if (this.state.selectedStats.includes(key)) {
      let filteredArray = this.state.selectedStats.filter(
        (item) => item !== key
      );
      this.setState({ selectedStats: filteredArray });
    } else {
      this.setState((prevState) => ({
        selectedStats: [...prevState.selectedStats, key],
      }));
    }
    // Deep clones an array from state
    let clonedArray = JSON.parse(JSON.stringify(this.state.graphData));
    let counter = 0;

    // This will handle setting the graph data variables when we want to remove checkboxes
    clonedArray.map((item, i) => {
      if (item.stat === key) {
        clonedArray.splice(i, 1);
      } else {
        if (item.stat !== key) {
          counter++;
        }
        if (counter === clonedArray.length) {
          clonedArray.push({
            stat: key,
            [this.state.currentPlayersData.player1.playerName]: 5,
            [this.state.currentPlayersData.player2.playerName]: 10,
          });
        }
      }
    });
    this.setState({
      graphData: clonedArray,
      redirect: "/",
      getNewPlayer1Data: true,
    });
  };

  renderPlayerSelect = () => {
    const playerOptions = [];
    this.state.currentPlayers.map((player) => {
      playerOptions.push({
        value: player.player_id,
        label: player.player_name,
      });
    });

    return (
      <div>
        <span> Players</span>
        <Select
          isMulti
          closeMenuOnSelect={false}
          name="players"
          options={playerOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          defaultValue={this.state.selectedPlayers}
          onChange={(players) => {
            this.setBarChartData(players);
          }}
        />
      </div>
    );
  };

  // Click button

  // Hit the api to get the matches where that player played

  // Set these matches into state

  //

  setScatterChartData = () => {
    let maxGamesPlayed = 10;
    let player1Data = [];
    let player2Data = [];
    let player1Name = null;
    let player2Name = null;

    this.state.players.map((player) => {
      if (player.player_id === this.state.player1Matches[0].player_id) {
        player1Name = player.first_name + " " + player.last_name;
      }
      if (player.player_id === this.state.player2Matches[0].player_id) {
        player2Name = player.first_name + " " + player.last_name;
      }
    });
    let stat1 = this.state.scatterStat1[0].toLowerCase().split(" ").join("_");
    let stat2 = this.state.scatterStat2[0].toLowerCase().split(" ").join("_");

    if (this.state.player1Matches.length > this.state.player2Matches.length) {
      maxGamesPlayed = this.state.player2Matches.length;
    } else {
      maxGamesPlayed = this.state.player1Matches.length;
    }

    for (let i = 0; i < maxGamesPlayed - 1; i++) {
      player1Data.push({
        x: this.state.player1Matches[i][stat1],
        y: this.state.player1Matches[i][stat2],
      });
      player2Data.push({
        x: this.state.player2Matches[i][stat1],
        y: this.state.player2Matches[i][stat2],
      });
    }

    this.setState({
      scatterGraphData: [
        {
          id: player1Name,
          data: player1Data,
        },
        {
          id: player2Name,
          data: player2Data,
        },
      ],
    });
  };

  setBarChartData = (players) => {
    const graphData = [];
    let stat = this.state.barStat1;
    let lowerStat = stat[0].toLowerCase().split(" ").join("_");
    players.map((player) => {
      this.state.playerPercentiles.map((percentile) => {
        if (player.value === percentile.player_id) {
          graphData.push({
            playerName: player.label,
            [lowerStat]: percentile[lowerStat],
          });
        }
      });
    });
    this.setState({
      barGraphData: graphData,
      selectedPlayers: players,
      refreshBarChart: false,
    });
  };

  renderBarChart = () => {
    let stat = this.state.barStat1;
    let lowerStat = stat[0].toLowerCase().split(" ").join("_");
    return (
      <Col lg={8} sm={12} style={{ marginLeft: "50px" }}>
        <div className="graph-container">
          <ResponsiveBar
            data={this.state.barGraphData}
            layout="horizontal"
            keys={[lowerStat]}
            indexBy="playerName"
            margin={{ top: 50, right: 120, bottom: 50, left: 120 }}
            padding={0.3}
            colors={{ scheme: "set1" }}
            maxValue={100}
            minValue={0}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "fries",
                },
                id: "dots",
              },
              {
                match: {
                  id: "sandwich",
                },
                id: "lines",
              },
            ]}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: [this.state.barStat1],
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: null,
              legendPosition: "middle",
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </div>
      </Col>
    );
  };

  // Renders the scatter-plot graph
  renderScatterPlot = () => {
    const data = [
      {
        id: "Player 1",
        data: [
          {
            x: 1,
            y: 1,
          },
          {
            x: 47,
            y: 84,
          },
          {
            x: 32,
            y: 61,
          },
          {
            x: 66,
            y: 96,
          },
          {
            x: 94,
            y: 75,
          },
          {
            x: 2,
            y: 112,
          },
          {
            x: 8,
            y: 91,
          },
          {
            x: 75,
            y: 4,
          },
          {
            x: 41,
            y: 23,
          },
          {
            x: 97,
            y: 34,
          },
          {
            x: 5,
            y: 64,
          },
          {
            x: 21,
            y: 53,
          },
          {
            x: 46,
            y: 96,
          },
          {
            x: 58,
            y: 91,
          },
          {
            x: 10,
            y: 73,
          },
          {
            x: 50,
            y: 65,
          },
          {
            x: 65,
            y: 30,
          },
          {
            x: 0,
            y: 80,
          },
          {
            x: 17,
            y: 12,
          },
          {
            x: 24,
            y: 62,
          },
          {
            x: 74,
            y: 48,
          },
          {
            x: 62,
            y: 85,
          },
          {
            x: 37,
            y: 98,
          },
          {
            x: 72,
            y: 103,
          },
          {
            x: 57,
            y: 57,
          },
          {
            x: 7,
            y: 48,
          },
          {
            x: 66,
            y: 51,
          },
          {
            x: 51,
            y: 76,
          },
          {
            x: 23,
            y: 96,
          },
          {
            x: 70,
            y: 21,
          },
          {
            x: 15,
            y: 59,
          },
          {
            x: 50,
            y: 90,
          },
          {
            x: 30,
            y: 9,
          },
          {
            x: 34,
            y: 113,
          },
          {
            x: 48,
            y: 66,
          },
          {
            x: 56,
            y: 71,
          },
          {
            x: 66,
            y: 58,
          },
          {
            x: 18,
            y: 67,
          },
          {
            x: 28,
            y: 12,
          },
          {
            x: 65,
            y: 60,
          },
          {
            x: 1,
            y: 69,
          },
          {
            x: 72,
            y: 84,
          },
          {
            x: 81,
            y: 44,
          },
          {
            x: 47,
            y: 88,
          },
          {
            x: 49,
            y: 34,
          },
          {
            x: 38,
            y: 59,
          },
          {
            x: 31,
            y: 88,
          },
          {
            x: 52,
            y: 71,
          },
          {
            x: 21,
            y: 34,
          },
          {
            x: 9,
            y: 107,
          },
        ],
      },
      {
        id: "Player 2",
        data: [
          {
            x: 86,
            y: 39,
          },
          {
            x: 0,
            y: 33,
          },
          {
            x: 99,
            y: 56,
          },
          {
            x: 30,
            y: 87,
          },
          {
            x: 0,
            y: 56,
          },
          {
            x: 97,
            y: 96,
          },
          {
            x: 10,
            y: 106,
          },
          {
            x: 54,
            y: 111,
          },
          {
            x: 26,
            y: 69,
          },
          {
            x: 63,
            y: 105,
          },
          {
            x: 2,
            y: 87,
          },
          {
            x: 84,
            y: 59,
          },
          {
            x: 81,
            y: 66,
          },
          {
            x: 98,
            y: 87,
          },
          {
            x: 28,
            y: 45,
          },
          {
            x: 98,
            y: 117,
          },
          {
            x: 45,
            y: 86,
          },
          {
            x: 5,
            y: 59,
          },
          {
            x: 75,
            y: 99,
          },
          {
            x: 42,
            y: 49,
          },
          {
            x: 93,
            y: 14,
          },
          {
            x: 38,
            y: 100,
          },
          {
            x: 8,
            y: 40,
          },
          {
            x: 43,
            y: 46,
          },
          {
            x: 8,
            y: 77,
          },
          {
            x: 48,
            y: 6,
          },
          {
            x: 66,
            y: 25,
          },
          {
            x: 64,
            y: 3,
          },
          {
            x: 60,
            y: 83,
          },
          {
            x: 14,
            y: 60,
          },
          {
            x: 44,
            y: 64,
          },
          {
            x: 28,
            y: 90,
          },
          {
            x: 62,
            y: 47,
          },
          {
            x: 70,
            y: 80,
          },
          {
            x: 3,
            y: 15,
          },
          {
            x: 23,
            y: 58,
          },
          {
            x: 37,
            y: 116,
          },
          {
            x: 95,
            y: 35,
          },
          {
            x: 39,
            y: 12,
          },
          {
            x: 53,
            y: 70,
          },
          {
            x: 97,
            y: 21,
          },
          {
            x: 82,
            y: 10,
          },
          {
            x: 25,
            y: 74,
          },
          {
            x: 5,
            y: 80,
          },
          {
            x: 75,
            y: 85,
          },
          {
            x: 60,
            y: 90,
          },
          {
            x: 16,
            y: 23,
          },
          {
            x: 69,
            y: 91,
          },
          {
            x: 74,
            y: 36,
          },
          {
            x: 54,
            y: 93,
          },
        ],
      },
    ];
    let stat1 = this.state.scatterStat1;
    let stat2 = this.state.scatterStat2;
    return (
      <div className="graph-container">
        <h1>
          {" "}
          {stat1} v {stat2}
        </h1>
        <ResponsiveScatterPlot
          colors={{ scheme: "set1" }}
          data={this.state.scatterGraphData || data}
          margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
          xScale={{ type: "linear", min: "auto", max: "auto" }}
          xFormat={function (e) {
            console.log(e);
            return e + " " + stat1;
          }}
          yScale={{ type: "linear", min: "auto", max: "auto" }}
          yFormat={function (e) {
            return e + " " + stat2;
          }}
          blendMode="multiply"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: stat1,
            legendPosition: "middle",
            legendOffset: 46,
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: stat2,
            legendPosition: "middle",
            legendOffset: -60,
          }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 130,
              translateY: 0,
              itemWidth: 100,
              itemHeight: 12,
              itemsSpacing: 5,
              itemDirection: "left-to-right",
              symbolSize: 12,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    );
  };

  // Renders the radar graph
  renderRadar = () => {
    return (
      <Col sm={12} lg={8}>
        <div className="graph-container">
          <ResponsiveRadar
            data={this.state.graphData}
            keys={[
              this.state.currentPlayersData?.player1.playerName,
              this.state.currentPlayersData?.player2.playerName,
            ]}
            indexBy="stat"
            maxValue="auto"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            curve="linearClosed"
            borderWidth={2}
            borderColor={{ from: "color" }}
            gridLevels={5}
            gridShape="linear"
            gridLabelOffset={16}
            enableDots={true}
            dotSize={6}
            dotColor={{ theme: "background" }}
            dotBorderWidth={1.5}
            dotBorderColor={{ from: "color" }}
            enableDotLabel={false}
            dotLabel="value"
            dotLabelYOffset={-12}
            colors={{ scheme: "set1" }}
            fillOpacity={0.6}
            blendMode="multiply"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            isInteractive={true}
            legends={[
              {
                anchor: "top-left",
                direction: "column",
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: "#999",
                symbolSize: 12,
                symbolShape: "circle",
              },
            ]}
          />
        </div>
      </Col>
    );
  };

  renderAdvancedOptions = () => {
    if (this.state.toggleAdvancedOptions) {
      return (
        <div>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={this.toggleAdvancedOptions}
          >
            {" "}
            Advanced Options
          </Button>
          <form>
            <label>
              <input type="radio" value="null" />
              Button
            </label>
            <label>
              <input type="radio" value="null" />
              Button
            </label>
            <label>
              <input type="radio" value="null" />
              Button
            </label>
            <label>
              <input type="radio" value="null" />
              Button
            </label>
            <label>
              <input type="radio" value="null" />
              Button
            </label>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <Button
            size="sm"
            variant="outline-primary"
            onClick={this.toggleAdvancedOptions}
          >
            {" "}
            Advanced Options
          </Button>
        </div>
      );
    }
  };

  renderModal() {
    return (
      <Popup
        onClose={() => {
          this.setState({ hide: false });
        }}
        defaultOpen={true}
        modal={true}
        disabled={this.state.disabled}
        closeOnDocumentClick
        position="center center"
      >
        <div>
          What kind of fan are you?
          <Popup
            disabled={this.state.disabled}
            closeOnDocumentClick
            position="bottom center"
            trigger={
              <div>
                <button onClick={this.fanTypeClickHandler} value="general">
                  {" "}
                  General
                </button>
                <button onClick={this.fanTypeClickHandler} value="fantasy">
                  {" "}
                  Fantasy
                </button>
                <button onClick={this.fanTypeClickHandler} value="betting">
                  {" "}
                  Betting
                </button>
              </div>
            }
          >
            <div>
              <p> What type of stats are you interested in? </p>
              <button onClick={this.teamPlayerClickHandler} value="team">
                {" "}
                Team
              </button>
              <button onClick={this.teamPlayerClickHandler} value="player">
                {" "}
                Player
              </button>
            </div>
          </Popup>
        </div>
      </Popup>
    );
  }

  checkStatTemplate = (type) => {
    let arr = [];
    if (type === "forward") {
      arr = [
        "all_run_metres",
        "errors",
        "tackle_breaks",
        "offloads",
        "post_contact_metres",
        "tackle_efficiency",
      ];
    } else {
      arr = [
        "all_run_metres",
        "errors",
        "line_breaks",
        "tackle_breaks",
        "tries",
        "try_assists",
      ];
    }

    arr = arr.sort();
    let y = JSON.parse(JSON.stringify(this.state.selectedStats));
    let x = y.sort();

    if (x.length > arr.length) {
      return null;
    } else {
      for (let i = 0; i < arr.length; i++) {
        if (x[i] !== arr[i]) {
          return false;
        }
      }
      return true;
    }
  };

  renderStatTemplates = () => {
    return (
      <div>
        <Form>
          <Form.Check
            disabled={true}
            inline
            onChange={() => {
              this.setState({
                selectedStats: [
                  "all_run_metres",
                  "errors",
                  "tackle_breaks",
                  "offloads",
                  "post_contact_metres",
                  "tackle_efficiency",
                ],
                // redirect: "/",
                // getNewPlayer1Data: true,
              });
            }}
            type="checkbox"
            checked={this.checkStatTemplate("forward")}
            id="forward-checkbox"
            label="Forward"
          ></Form.Check>
          <Form.Check
            disabled={true}
            onChange={() => {
              this.setState({
                selectedStats: [
                  "all_run_metres",
                  "errors",
                  "line_breaks",
                  "tackle_breaks",
                  "tries",
                  "try_assists",
                ],
                // redirect: "/",
                // getNewPlayer1Data: true,
              });
            }}
            inline
            type="checkbox"
            id="backs-checkbox"
            checked={this.checkStatTemplate("back")}
            label="Backs"
          ></Form.Check>
        </Form>
      </div>
    );
  };

  // Contains the buttons for the fan type and the team/player buttons
  renderPlayerAndTeamTabs = () => {
    return (
      <div>
        <Tabs
          defaultActiveKey="player"
          id="teamOrPlayerSelector"
          onSelect={(e) => {
            if (this.state.playerOrTeam !== e)
              this.setState({ playerOrTeam: e });
          }}
        >
          <Tab eventKey="player" title="Player"></Tab>
          <Tab disabled={true} eventKey="team" title="Team"></Tab>
        </Tabs>
      </div>
    );
  };

  renderPositionToggle = () => {
    if (this.state.showPositionButtons) {
      return (
        <div style={{ visibility: this.state.visibility }}>
          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="positions"
              onChange={() => {
                this.setState({
                  showPositionButtons: !this.state.showPositionButtons,
                });
              }}
            />
          </Form>
          <Form>
            <Row>
              <Col>
                <Form.Check type="checkbox" id="checkbox" label="2nd Row" />
              </Col>
              <Col>
                <Form.Check type="checkbox" id="checkbox" label="Five-Eighth" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Check type="checkbox" id="checkbox" label="Interchange" />
              </Col>
              <Col>
                <Form.Check type="checkbox" id="checkbox" label="Hooker" />
              </Col>
            </Row>

            <Row>
              {" "}
              <Col>
                <Form.Check type="checkbox" id="checkbox" label="Fullback" />
              </Col>
              <Col>
                <Form.Check type="checkbox" id="checkbox" label="Halfback" />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Check type="checkbox" id="checkbox" label="Lock" />
              </Col>
              <Col>
                <Form.Check type="checkbox" id="checkbox" label="Prop" />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Check type="checkbox" id="checkbox" label="Winger" />
              </Col>
              <Col>
                <Form.Check type="checkbox" id="checkbox" label="Center" />
              </Col>
            </Row>
          </Form>
        </div>
      );
    }
    return (
      <div style={{ visibility: this.state.visibility }}>
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Positions"
            onChange={() => {
              this.setState({
                showPositionButtons: !this.state.showPositionButtons,
              });
            }}
          />
        </Form>
      </div>
    );
  };

  renderStatDropDowns = () => {
    if (this.state.graphType === "bar" || this.state.graphType === "rankings") {
      return (
        <div>
          <span> Stat 1 </span>
          <Select
            options={this.state.options}
            onChange={(e) => {
              this.setState({
                barStat1: [e.value],
                refreshBarChart: true,
              });
            }}
            placeholder={this.state.barStat1[0]}
          />
        </div>
      );
    }
    return (
      <div>
        <span> Stat 1 </span>
        <Select
          options={this.state.options}
          onChange={(e) => {
            this.setState(
              {
                scatterStat1: [e.value],
              },
              this.setScatterChartData
            );
          }}
          placeholder={this.state.scatterStat1[0]}
        />
        <span>Stat 2</span>
        <Select
          options={this.state.options}
          onChange={(e) => {
            this.setState(
              {
                scatterStat2: [e.value],
              },
              this.setScatterChartData
            );
          }}
          placeholder={this.state.scatterStat2[0]}
        />
      </div>
    );
  };

  renderTeamDropDown = () => {
    const options = [];
    this.state.teams.map((team) => {
      options.push({ label: team.team_name, value: team.team_name });
    });
    return (
      <div>
        <span> Team 1 </span>
        <Select
          options={options}
          onMenuOpen={() => this.setState({ visibility: "hidden" })}
          onMenuClose={() => this.setState({ visibility: null })}
        />
        <span> Team 2 </span>
        <Select
          options={options}
          onMenuOpen={() => this.setState({ visibility: "hidden" })}
          onMenuClose={() => this.setState({ visibility: null })}
        />
      </div>
    );
  };

  renderPlayerDropDowns = () => {
    const options = [];
    this.state.currentPlayers.map((player) => {
      options.push({
        value: player.player_id,
        label: player.player_name,
      });
    });
    return (
      <div>
        <span> Player 1 </span>
        <Select
          options={options}
          onChange={this.playerButtonSelectHandler1}
          placeholder={this.state.currentPlayersData.player1.playerName}
        />
        <span> Player 2 </span>
        <Select
          options={options}
          onChange={this.playerButtonSelectHandler2}
          placeholder={this.state.currentPlayersData.player2.playerName}
        />
      </div>
    );
  };

  renderSingleStat = (number) => {
    return this.state.options[number].label.toLowerCase().split(" ").join("_");
  };

  renderStatCheckBox = () => {
    return (
      <Form>
        <Form.Row className="align-items-center">
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(0)}
              label={this.state.options[0].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(0)
              )}
            />
          </Col>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(1)}
              label={this.state.options[1].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(1)
              )}
            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(2)}
              label={this.state.options[2].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(2)
              )}
            />
          </Col>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(3)}
              label={this.state.options[3].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(3)
              )}
            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(4)}
              label={this.state.options[4].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(4)
              )}
            />
          </Col>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(5)}
              label={this.state.options[5].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(5)
              )}
            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(6)}
              label={this.state.options[6].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(6)
              )}
            />
          </Col>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(7)}
              label={this.state.options[7].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(7)
              )}
            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(8)}
              label={this.state.options[8].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(8)
              )}
            />
          </Col>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(9)}
              label={this.state.options[9].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(9)
              )}
            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(10)}
              label={this.state.options[10].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(10)
              )}
            />
          </Col>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(11)}
              label={this.state.options[11].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(11)
              )}
            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(12)}
              label={this.state.options[12].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(12)
              )}
            />
          </Col>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(13)}
              label={this.state.options[13].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(13)
              )}
            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(14)}
              label={this.state.options[14].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(14)
              )}
            />
          </Col>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(15)}
              label={this.state.options[15].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(15)
              )}
            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(16)}
              label={this.state.options[16].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(16)
              )}
            />
          </Col>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(17)}
              label={this.state.options[17].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(17)
              )}
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Check
              onChange={this.statCheckBoxChangeHandler}
              type="checkbox"
              id={this.renderSingleStat(18)}
              label={this.state.options[18].label}
              checked={this.state.selectedStats.includes(
                this.renderSingleStat(18)
              )}
            />
          </Col>
        </Form.Row>
      </Form>
    );
  };

  renderDateButtons = () => {
    return (
      <div>
        <Form>
          <p> Start Date </p>
          <DatePicker
            disabled={true}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            selected={this.state.startDate.date}
            onChange={(date) => this.setState({ startDate: { date: date } })}
            maxDate={Date.now()}
          />
          <br></br>
          <br></br>
          <p> End Date </p>
          <DatePicker
            disabled={true}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            selected={this.state.endDate.date}
            onChange={(date) => this.setState({ endDate: { date: date } })}
            maxDate={Date.now()}
          />
        </Form>
      </div>
    );
  };

  renderVenueSelect = () => {
    const options = [
      { value: "Suncorp Stadium", label: "Suncorp Stadium" },
      { value: "GIO Stadium	", label: "	GIO Stadium" },
      { value: "AAMI Park", label: "AAMI Park" },
    ];
    return (
      <div>
        <Select
          defaultValue={options}
          isMulti
          closeMenuOnSelect={false}
          name="venues"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    );
  };

  renderGraphTabs = () => {
    return (
      <div>
        <Tabs
          defaultActiveKey="radar"
          id="graphTypeSelector"
          onSelect={(e) => {
            if (this.state.graphType !== e) this.setState({ graphType: e });
          }}
        >
          <Tab eventKey="radar" title="Radar"></Tab>
          <Tab eventKey="scatter" title="Scatter"></Tab>
          <Tab eventKey="bar" title="Bar"></Tab>
          <Tab eventKey="rankings" title="Rankings"></Tab>
        </Tabs>
      </div>
    );
  };

  renderMinimumGamesPlayed = () => {
    return (
      <div>
        <span> Minimum games played</span>
        <RangeSlider
          min={0}
          max={10}
          value={this.state.value}
          onChange={(changeEvent) => {
            this.setState({ value: changeEvent.target.value });
          }}
        />
      </div>
    );
  };

  renderAverageOrTotalCheckbox = () => {
    return (
      <div>
        <Form>
          <Form.Check
            inline
            onChange={() => {
              this.setState({
                redirect: "/",
                getNewPlayer1Data: true,
                averageOrTotal: "average",
                checked: !this.state.checked,
              });
            }}
            type="checkbox"
            checked={this.state.checked}
            id="average-checkbox"
            label="Average"
          ></Form.Check>
          <Form.Check
            onChange={() => {
              this.setState({
                redirect: "/",
                getNewPlayer1Data: true,
                averageOrTotal: "total",
                checked: !this.state.checked,
              });
            }}
            inline
            type="checkbox"
            id="total-checkbox"
            checked={!this.state.checked}
            label="Total"
          ></Form.Check>
        </Form>
      </div>
    );
  };

  renderMotionDiv = () => {
    return (
      <motion.div
        style={{
          height: "250px",
          width: "250px",
          backgroundColor: "grey",
          opacity: 0.5,
        }}
        animate={{ scale: 0, x: -115, y: -155 }}
        transition={{ duration: 0.5 }}
      ></motion.div>
    );
  };

  renderRankings = () => {
    let playerNamesArray = [];
    let statsArray = [];
    let topTenArray = [];
    let topTenPlayers = [];
    // This is used in a map below, to ensure that the right amount of games are pushed into the array
    let x = 0;
    let numberOfEntries = 50;
    let stat = this.state.barStat1[0].toLowerCase().split(" ").join("_");

    this.state.currentPlayers.map((player) => {
      statsArray.push(player[stat]);
    });

    statsArray = statsArray.sort((a, b) => a - b);

    for (let i = 1; i < numberOfEntries; i++) {
      topTenArray.push(statsArray[statsArray.length - i]);
    }

    topTenArray.map((number) => {
      this.state.currentPlayers.map((player) => {
        if (player[stat] === number && x < numberOfEntries) {
          topTenPlayers.push(player);
          x++;
        }
      });
    });

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Games Played</th>
              <th>{this.state.barStat1}</th>
            </tr>
          </thead>
          <tbody>
            {topTenPlayers.map((player, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td> {player.player_name}</td>
                  <td>{player.games}</td>
                  <td>{player[stat]}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };

  // This function contains a case statement that will determine which graph is rendered to the page
  renderGraph = () => {
    switch (this.state.graphType) {
      default:
        return this.renderRadar();
      case "scatter":
        return this.renderScatterPlot();
      case "bar":
        return this.renderBarChart();
      case "rankings":
        return this.renderRankings();
    }
  };

  // Renders the control for the radar graph
  radarGraphControls = () => {
    return (
      <Col xs lg>
        {this.renderStatCheckBox()}
        <br></br>
        {/* {this.renderStatTemplates()} */}
        {this.state.playerOrTeam === "team"
          ? this.renderTeamDropDown()
          : this.renderPlayerDropDowns()}
      </Col>
    );
  };

  // Renders the controls for the scatter graph
  scatterGraphControls = () => {
    return (
      <>
        {this.renderStatDropDowns()}
        {this.state.playerOrTeam === "team"
          ? this.renderTeamDropDown()
          : this.renderPlayerDropDowns()}
      </>
    );
  };

  // Renders the controls for the bar graph
  barGraphControls = () => {
    return (
      <>
        {this.renderStatDropDowns("bar")}
        {this.renderPlayerSelect()}
      </>
    );
  };

  rankingGraphControls = () => {
    return <>{this.renderStatDropDowns("rankings")}</>;
  };

  // Handles logic to decide which graph to display
  graphSelect = () => {
    switch (this.state.graphType) {
      default:
        return this.radarGraphControls();

      case "scatter":
        return this.scatterGraphControls();

      case "bar":
        return this.barGraphControls();

      case "rankings":
        return this.rankingGraphControls();
    }
  };

  // Renders the graph control to screen
  renderGraphControl = () => {
    return (
      <Col sm={12} lg={3} style={{ backgroundColor: "#eaecef" }}>
        {/* {this.renderPlayerAndTeamTabs()} */}
        {this.renderGraphTabs()}
        <br></br>
        {this.graphSelect()}

        {this.state.playerOrTeam === "team"
          ? this.renderPositionToggle()
          : null}
        <br></br>
        {/* {this.renderDateButtons()} */}
        {/* {this.renderVenueSelect()} */}
        {this.renderAverageOrTotalCheckbox()}
        {/* {this.renderMinimumGamesPlayed()} */}
        {/* {this.renderAdvancedOptions()} */}
      </Col>
    );
  };

  render() {
    // if (this.state.hide) {
    //   return (
    //     <>
    //       {this.renderControlBar()}
    //       {this.renderModal()}
    //     </>
    //   )
    // }
    if (this.state.redirect) {
      this.handleRefresh();
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <>
        {/* {this.renderMotionDiv()} */}
        <Row>
          {this.renderGraphControl()}
          {this.renderGraph()}
        </Row>
      </>
    );
  }
}

export default Home;
