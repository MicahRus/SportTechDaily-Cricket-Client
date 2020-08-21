import React from "react";
import { Redirect } from "react-router-dom";

import { Form, Col, Row, Tab, Tabs, Button } from "react-bootstrap";

import Select from "react-select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ResponsiveRadar } from "@nivo/radar";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { ResponsiveBar } from "@nivo/bar";

import BarChart from "./BarChart";

import Popup from "reactjs-popup";

import { motion } from "framer-motion";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";

class Home extends React.Component {
  state = {
    visibility: null,
    selectedStats: [
      "all_run_metres",
      "errors",
      "tries",
      "try_assists",
      "tackle_breaks",
      "line_breaks",
    ],
    stats: [{ kicks: 0 }, { passes: 0 }],
    barStat1: ["Conversions"],
    currentPlayers: [],
    checked: true,
    templateChecked: true,
    selectedPlayers: [
      { value: "500663", label: "James Tedesco" },
      { value: "504870", label: "Kalyn Ponga" },
    ],
    value: 5,
    players: [],
    graphType: "bar",
    redirect: null,
    showPositionButtons: false,
    hide: true,
    startDate: { date: new Date() },
    endDate: { date: new Date() },
    disabled: false,
    fanType: "general",
    playerOrTeam: "player",
    teams: ["test"],
    toggleAdvancedOptions: false,
    barGraphData: [
      { playerName: "James Tedesco", conversions: 50 },
      { playerName: "Kalyn Ponga", conversions: 98 },
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
  };

  componentDidMount() {
    this.getAllPlayersData();
    this.getAllTeamsData();
    this.getCurrentPlayers();
    this.getPlayerPercentiles();

    if (this.state.refreshBarChart) {
      this.setBarChartData(this.state.selectedPlayers);
    }
  }

  getPlayerPercentiles = async () => {
    const response = await fetch("http://192.168.0.7:3001/percentiles");
    const data = await response.json();
    console.log(data.rows);

    this.setState({ playerPercentiles: data.rows });
  };

  // Retrieves all player data from database
  getAllPlayersData = async () => {
    const response = await fetch("http://192.168.0.7:3001/players");
    const data = await response.json();
    this.setState({ players: data.rows });
  };

  getCurrentPlayers = async () => {
    const response = await fetch("http://192.168.0.7:3001/currentplayers");
    const data = await response.json();

    this.setState({
      currentPlayers: data.rows,
    });

    this.setStats();
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
      `http://192.168.0.7:3001/player/id?playerId=${playerId}`
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
    const response = await fetch("http://192.168.0.7:3001/teams");
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
      console.log("hit");
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

      // Finds the percentile based off the array and player stat passed in
      let percentile = percentileFinder(array, player.data[0][stat]);
      percentile = Math.round(percentile);

      // Checks which player is selected
      if (playerNumber === "player1") {
        newData.push({
          stat: stat,
          [playerName]: percentile,
          [keys[2]]: values[2],
        });
      } else {
        newData.push({
          stat: stat,
          [keys[1]]: values[1],
          [playerName]: percentile,
        });
      }
    });

    this.setState({ graphData: newData, redirect: "/" });
  };

  toggleAdvancedOptions = () => {
    this.setState({ toggleAdvancedOptions: !this.state.toggleAdvancedOptions });
  };

  playerButtonSelectHandler1 = (event) => {
    let playerId = event.value;
    let playerName = event.label;
    let playerNumber = "player1";

    this.getPlayerData(playerId, playerName, playerNumber);
  };

  playerButtonSelectHandler2 = (event) => {
    let playerId = event.value;
    let playerName = event.label;
    let playerNumber = "player2";

    this.getPlayerData(playerId, playerName, playerNumber);
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

  setBarChartData = (players) => {
    const graphData = [];
    let stat = this.state.barStat1;
    let lowerStat = stat[0].toLowerCase().split(" ").join("_");

    // "country": "AD",
    // "hot dog": 94,
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
      <ResponsiveBar
        data={this.state.barGraphData}
        layout="horizontal"
        keys={[lowerStat]}
        indexBy="playerName"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: "nivo" }}
        maxValue={100}
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
          legend: "Player Name",
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
    );
  };

  // Renders the scatter-plot graph
  renderScatterPlot = () => {
    const data = [
      {
        id: "Sydney Roosters",
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
        id: "Brisbane Bronco's",
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
    return (
      <div div style={{ height: "100%", width: "75%" }}>
        <ResponsiveScatterPlot
          data={data}
          margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
          xScale={{ type: "linear", min: 0, max: "auto" }}
          xFormat={function (e) {
            return e + " kg";
          }}
          yScale={{ type: "linear", min: 0, max: "auto" }}
          yFormat={function (e) {
            return e + " cm";
          }}
          blendMode="multiply"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Stat 1",
            legendPosition: "middle",
            legendOffset: 46,
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Stat 2",
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
      <div style={{ height: "100%", width: "75%" }}>
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
          gridShape="circular"
          gridLabelOffset={36}
          enableDots={true}
          dotSize={10}
          dotColor={{ theme: "background" }}
          dotBorderWidth={2}
          dotBorderColor={{ from: "color" }}
          enableDotLabel={true}
          dotLabel="value"
          dotLabelYOffset={-12}
          colors={{ scheme: "nivo" }}
          fillOpacity={0.25}
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

  renderStatTemplates = () => {
    return (
      <div>
        <Form inline>
          <Form.Check
            onChange={() => {
              this.setState({ templateChecked: !this.state.templateChecked });
            }}
            type="checkbox"
            checked={!this.state.templateChecked}
            id="checkbox"
            label="Forward"
          ></Form.Check>
          <Form.Check
            onChange={() => {
              this.setState({ templateChecked: !this.state.templateChecked });
            }}
            type="checkbox"
            id="checkbox"
            checked={this.state.templateChecked}
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
          <Tab eventKey="team" title="Team"></Tab>
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
    const options = [
      "Conversions",
      "Errors",
      "Fantasy Points Total",
      "Intercepts",
      "Kick Metres",
      "Field Goals",
      "Line Break Assists",
      "Line Breaks",
      "Minutes Played",
      "Missed Tackles",
      "Offloads",
      "One On One Steal",
      "Tackle Breaks",
      "Tackle Efficiency",
      "Tackles Made",
      "Tries",
      "Try Assists",
      "All Run Metres",
      "Post Contact Metres",
    ];

    if (this.state.graphType === "bar") {
      return (
        <div>
          <Form inline>
            <Row>
              <Col>
                <Form.Label> Stat</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  onChange={(e) => {
                    this.setState({
                      barStat1: [e.target.value],
                      refreshBarChart: true,
                    });
                  }}
                >
                  {options.map((options) => {
                    return <option>{options}</option>;
                  })}
                </Form.Control>
              </Col>
            </Row>
          </Form>
        </div>
      );
    }
    return (
      <div>
        <Form inline>
          <Row>
            <Col>
              <Form.Label> Stat 1</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={(e) => {
                  this.setState({ scatterStat1: [e.target.value] });
                }}
              >
                {options.map((options) => {
                  return <option>{options}</option>;
                })}
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label> Stat 2</Form.Label>
              <Form.Control
                onChange={(e) => {
                  this.setState({ scatterStat2: [e.target.value] });
                }}
                as="select"
                custom
              >
                {options.map((options) => {
                  return <option>{options}</option>;
                })}
              </Form.Control>
            </Col>
          </Row>
        </Form>
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

  renderStatCheckBox = () => {
    return (
      <div>
        <Form>
          <Form.Row>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="conversions"
                label="Conversions"
                checked={this.state.selectedStats.includes("conversions")}
              />
            </Col>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="errors"
                label="Errors"
                checked={this.state.selectedStats.includes("errors")}
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="fantasy_points_total"
                label="Fantasy"
                checked={this.state.selectedStats.includes(
                  "fantasy_points_total"
                )}
              />
            </Col>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="intercepts"
                label="Intercepts"
                checked={this.state.selectedStats.includes("intercepts")}
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="kick_metres"
                label="Kick Metres"
                checked={this.state.selectedStats.includes("kick_metres")}
              />
            </Col>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="field_goals"
                label="Field Goals"
                checked={this.state.selectedStats.includes("field_goals")}
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="line_break_assists"
                label="Line Break Assists"
                checked={this.state.selectedStats.includes(
                  "line_break_assists"
                )}
              />
            </Col>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="line_breaks"
                label="Line Breaks"
                checked={this.state.selectedStats.includes("line_breaks")}
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="minutes_played"
                label="Minutes Played"
                checked={this.state.selectedStats.includes("minutes_played")}
              />
            </Col>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="missed_tackles"
                label="Missed Tackles"
                checked={this.state.selectedStats.includes("missed_tackles")}
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="offloads"
                label="Off loads"
                checked={this.state.selectedStats.includes("offloads")}
              />
            </Col>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="one_on_one_steal"
                label="One On One Steal"
                checked={this.state.selectedStats.includes("one_on_one_steal")}
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="tackle_breaks"
                label="Tackle Breaks"
                checked={this.state.selectedStats.includes("tackle_breaks")}
              />
            </Col>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="tackle_efficiency"
                label="Tackle"
                checked={this.state.selectedStats.includes("tackle_efficiency")}
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="tackles_made"
                label="Tackles Made"
                checked={this.state.selectedStats.includes("tackles_made")}
              />
            </Col>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="tries"
                label="Tries"
                checked={this.state.selectedStats.includes("tries")}
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="try_assists"
                label="Try Assists"
                checked={this.state.selectedStats.includes("try_assists")}
              />
            </Col>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="all_run_metres"
                label="All Run Metres"
                checked={this.state.selectedStats.includes("all_run_metres")}
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Check
                onChange={this.statCheckBoxChangeHandler}
                type="checkbox"
                id="post_contact_metres"
                label="Post Contact Metres"
                checked={this.state.selectedStats.includes(
                  "post_contact_metres"
                )}
              />
            </Col>
          </Form.Row>
        </Form>
      </div>
    );
  };

  renderDateButtons = () => {
    return (
      <div>
        <Form>
          <DatePicker
            selected={this.state.startDate.date}
            onChange={(date) => this.setState({ startDate: { date: date } })}
          />

          <DatePicker
            selected={this.state.endDate.date}
            onChange={(date) => this.setState({ endDate: { date: date } })}
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
        <Form inline>
          <Form.Check
            onChange={() => {
              this.setState({ checked: !this.state.checked });
            }}
            type="checkbox"
            checked={this.state.checked}
            id="checkbox"
            label="Average"
          ></Form.Check>
          <Form.Check
            onChange={() => {
              this.setState({ checked: !this.state.checked });
            }}
            type="checkbox"
            id="checkbox"
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

  // This function contains a case statement that will determine which graph is rendered to the page
  renderGraph = () => {
    switch (this.state.graphType) {
      default:
        return this.renderRadar();
      case "scatter":
        return this.renderScatterPlot();
      case "bar":
        return this.renderBarChart();
    }
  };

  // Renders the control for the radar graph
  radarGraphControls = () => {
    return (
      <>
        {this.renderStatCheckBox()}
        <br></br>
        {this.renderStatTemplates()}
        {this.state.playerOrTeam === "team"
          ? this.renderTeamDropDown()
          : this.renderPlayerDropDowns()}
      </>
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

  // Handles logic to decide which graph to display
  graphSelect = () => {
    switch (this.state.graphType) {
      default:
        return this.radarGraphControls();

      case "scatter":
        return this.scatterGraphControls();

      case "bar":
        return this.barGraphControls();
    }
  };

  // Renders the graph control to screen
  renderGraphControl = () => {
    return (
      <div style={{ height: "100%", width: "25%" }}>
        <Form.Group>
          <div>
            <br></br>
            {this.renderPlayerAndTeamTabs()}
            <br></br>
            {this.renderGraphTabs()}
            <br></br>
            {this.graphSelect()}

            {this.state.playerOrTeam === "team"
              ? this.renderPositionToggle()
              : null}
            <br></br>
            {this.renderDateButtons()}
            <br></br>
            {this.renderVenueSelect()}
            <br></br>
            {this.renderAverageOrTotalCheckbox()}
            <br></br>
            {this.renderMinimumGamesPlayed()}
            <br></br>
            {/* {this.renderAdvancedOptions()} */}
          </div>
        </Form.Group>
      </div>
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
        <div
          style={{
            display: "flex",
            height: "80vh",
            width: "100%",
          }}
        >
          {this.renderGraphControl()}
          {this.renderGraph()}
        </div>
      </>
    );
  }
}

export default Home;
