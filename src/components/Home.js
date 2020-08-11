import React from "react";
import { ResponsiveRadar } from "@nivo/radar";
import Popup from "reactjs-popup";

class Home extends React.Component {
  state = {
    players: [],
    disabled: false,
    fanType: "general",
    playerOrTeam: "player",
    data: [
      {
        taste: "3pts Made",
        "Lebron James": 6,
        "Stephen Curry": 9,
      },
      {
        taste: "2pts Made",
        "Lebron James": 15,
        "Stephen Curry": 10,
      },
      {
        taste: "Free Throws Made",
        "Lebron James": 7,
        "Stephen Curry": 13,
      },
      {
        taste: "Rebounds",
        "Lebron James": 12,
        "Stephen Curry": 5,
      },
      {
        taste: "Blocks",
        "Lebron James": 6,
        "Stephen Curry": 1,
      },
      {
        taste: "Assists",
        "Lebron James": 13,
        "Stephen Curry": 10,
      },
    ],
  };

  fanTypeClickHandler = (event) => {
    this.setState({ fanType: event.target.value });
  };

  teamPlayerClickHandler = (event) => {
    this.setState({ disabled: true, playerOrTeam: event.target.value });
  };

  handleClose = () => {
    return this.Modal2();
  };

  renderRadar = () => {
    return (
      <div style={{ height: "1000px" }}>
        <ResponsiveRadar
          data={this.state.data}
          keys={["Lebron James", "Stephen Curry"]}
          indexBy="taste"
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

  Modal() {
    return (
      <Popup
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

  teamOrPlayerRadioChangeHandler = (event) => {
    this.setState({ playerOrTeam: event.target.value });
  };

  fanTypeRadioChangeHandler = (event) => {
    this.setState({ fanType: event.target.value });
  };

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

  componentDidMount() {
    // this.getData();
  }

  handleSelect = (event) => {
    console.log("hit");
    console.log(event.target[0]);
    console.log(event.target);
    console.log(event);
    // this.getPlayerData()
  };

  renderButton = () => {
    console.log(this.state);
    return (
      <form onChange={this.handleSelect}>
        <select>
          {this.state.players[0]?.api.players.map((player) => {
            let key = 0;
            key++;
            return (
              <option key={player.id}>
                {player.firstName} {player.lastName}
              </option>
            );
          })}
        </select>
      </form>
    );
  };

  getData = async () => {
    const response = await fetch(
      "https://api-nba-v1.p.rapidapi.com/players/country/USA",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "7a5cdcbc39mshe66fcd61b6c65acp103732jsn4cbc50612a05",
        },
      }
    );

    const data = await response.json();

    console.log("hit api");
    console.log(data);
    this.setState({ players: [...this.state.players, data] });
  };

  getPlayerData = async () => {
    const response = await fetch(
      "https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/265",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "7a5cdcbc39mshe66fcd61b6c65acp103732jsn4cbc50612a05",
        },
      }
    );

    const data = await response.json();
    console.log(data);
    this.setState({ players: data });
  };

  render() {
    return (
      <>
        {this.renderControlBar()}
        {/* {this.renderButton()} */}
        {this.Modal()}
        {this.renderRadar()}
      </>
    );
  }
}

export default Home;
