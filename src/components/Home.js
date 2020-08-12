import React from "react";

import { ResponsiveRadar } from "@nivo/radar";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";

import Popup from "reactjs-popup";

import { motion } from "framer-motion";

class Home extends React.Component {
  state = {
    players: [],
    graphData: [],
    hide: true,
    disabled: false,
    fanType: "general",
    playerOrTeam: "player",
    toggleAdvancedOptions: false,
    data: [
      {
        stat: "3pts Made",
        "Lebron James": 6,
        "Stephen Curry": 9,
      },
      {
        stat: "2pts Made",
        "Lebron James": 15,
        "Stephen Curry": 10,
      },
      {
        stat: "Free Throws Made",
        "Lebron James": 7,
        "Stephen Curry": 13,
      },
      {
        stat: "Rebounds",
        "Lebron James": 12,
        "Stephen Curry": 5,
      },
      {
        stat: "Blocks",
        "Lebron James": 6,
        "Stephen Curry": 1,
      },
      {
        stat: "Assists",
        "Lebron James": 13,
        "Stephen Curry": 10,
      },
    ],
  };

  componentDidMount() {
    this.getAllPlayersData();
  }

  getAllPlayersData = async () => {
    const response = await fetch("http://localhost:3001/players");
    const data = await response.json();
    this.setState({ players: data.rows });
  };

  getPlayerData = async (playerId, playerName) => {
    const response = await fetch(
      `http://localhost:3001/player/id?playerId=${playerId}`
    );
    const data = await response.json();
    this.setState({
      currentPlayersData: { player1: { playerName, data: data.rows } },
    });
    this.setGraphData(playerName);
  };

  setGraphData = (playerName) => {
    if (!!this.state.currentPlayersData) {
      let kicks = 0;
      let passes = 0;
      let points = 0;
      let tackles = 0;
      let tries = 0;
      for (let i = 0; i <= 25; i++) {
        kicks += this.state.currentPlayersData?.player1.data[i].kicks;
        passes += this.state.currentPlayersData?.player1.data[i].passes;
        points += this.state.currentPlayersData?.player1.data[i].points;
        tackles += this.state.currentPlayersData?.player1.data[i].tackles_made;
        tries += this.state.currentPlayersData?.player1.data[i].tries;

        if (i === 25) {
          this.setState({
            graphData: [
              {
                stat: "kicks",
                [playerName]: kicks,
                default: 7,
              },
              {
                stat: "passes",
                [playerName]: passes,
                default: 7,
              },
              {
                stat: "points",
                [playerName]: points,
                default: 7,
              },
              {
                stat: "tackles",
                [playerName]: tackles,
                default: 7,
              },
              {
                stat: "tries",
                [playerName]: tries,
                default: 7,
              },
            ],
          });
        }
      }
    }
  };

  fanTypeClickHandler = (event) => {
    this.setState({ fanType: event.target.value });
  };

  teamPlayerClickHandler = (event) => {
    this.setState({ disabled: true, playerOrTeam: event.target.value });
  };

  toggleAdvancedOptions = () => {
    this.setState({ toggleAdvancedOptions: !this.state.toggleAdvancedOptions });
  };

  teamOrPlayerRadioChangeHandler = (event) => {
    this.setState({ playerOrTeam: event.target.value });
  };

  fanTypeRadioChangeHandler = (event) => {
    this.setState({ fanType: event.target.value });
  };

  playerButtonSelectHandler = (event) => {
    let playerId = event.target.value;
    let playerName = event.target[event.target.selectedIndex].innerText;
    this.getPlayerData(playerId, playerName);
  };

  renderScatterPlot = () => {
    return (
      <div style={{ height: "950px" }}>
        <ResponsiveScatterPlot
          data={this.state.data}
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
            legend: "weight",
            legendPosition: "middle",
            legendOffset: 46,
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "size",
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

  renderRadar = () => {
    console.log(this.state);
    return (
      <div style={{ height: "1000px" }}>
        <ResponsiveRadar
          data={this.state.graphData}
          keys={[this.state.currentPlayersData?.player1.playerName, "default"]}
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
          <button onClick={this.toggleAdvancedOptions}>
            {" "}
            Advanced Options
          </button>
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
          <button onClick={this.toggleAdvancedOptions}>
            {" "}
            Advanced Options
          </button>
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

  renderControlBar = () => {
    return (
      <div>
        <form>
          <label>
            <input
              type="radio"
              value="general"
              checked={this.state.fanType === "general"}
              onChange={this.fanTypeRadioChangeHandler}
            />
            General
          </label>
          <label>
            <input
              type="radio"
              value="fantasy"
              checked={this.state.fanType === "fantasy"}
              onChange={this.fanTypeRadioChangeHandler}
            />
            Fantasy
          </label>
          <label>
            <input
              type="radio"
              value="betting"
              checked={this.state.fanType === "betting"}
              onChange={this.fanTypeRadioChangeHandler}
            />
            Betting
          </label>
        </form>

        <form>
          <label>
            <input
              type="radio"
              value="team"
              checked={this.state.playerOrTeam === "team"}
              onChange={this.teamOrPlayerRadioChangeHandler}
            />
            Team
          </label>
          <label>
            <input
              type="radio"
              value="player"
              checked={this.state.playerOrTeam === "player"}
              onChange={this.teamOrPlayerRadioChangeHandler}
            />
            Player
          </label>
        </form>
      </div>
    );
  };

  renderButton = () => {
    return (
      <div>
        <span> Player 1</span>
        <form>
          <select onChange={this.playerButtonSelectHandler}>
            {this.state.players?.map((player) => {
              return (
                <option key={player.player_id} value={player.player_id}>
                  {player.first_name} {player.last_name}
                </option>
              );
            })}
          </select>
        </form>
        <span> Player 2</span>
        <form onChange={this.playerButtonSelectHandler}>
          <select>
            {this.state.players?.map((player) => {
              return (
                <option key={player.player_id} value={player.playerId}>
                  {player.first_name} {player.last_name}
                </option>
              );
            })}
          </select>
        </form>
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

  render() {
    // if (this.state.hide) {
    //   return (
    //     <>
    //       {this.renderControlBar()}
    //       {this.renderModal()}
    //     </>
    //   );
    // }
    return (
      <>
        {this.renderControlBar()}
        {this.renderMotionDiv()}
        {this.renderButton()}
        {this.renderRadar()}
        {/* {this.renderScatterPlot()} */}
        {this.renderAdvancedOptions()}
      </>
    );
  }
}

export default Home;
