import React from "react";
import { ResponsiveRadar } from "@nivo/radar";

class Home extends React.Component {
  state = {
    players: [],
    data: [
      {
        taste: "3pts Made",
        "Lebron James": 72,
        "Steph Curry": 64,
      },
      {
        taste: "2pts Made",
        "Lebron James": 72,
        "Steph Curry": 64,
      },
      {
        taste: "Free Throws Made",
        "Lebron James": 72,
        "Steph Curry": 64,
      },
      {
        taste: "Rebounds",
        "Lebron James": 72,
        "Steph Curry": 64,
      },
      {
        taste: "Blocks",
        "Lebron James": 72,
        "Steph Curry": 64,
      },
      {
        taste: "Assists",
        "Lebron James": 72,
        "Stephen Curry": 64,
      },
    ],
  };

  componentDidMount() {
    this.getData();
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
      <div style={{ height: "1000px" }}>
        {this.renderButton()}
        <ResponsiveRadar
          data={this.state.data}
          keys={["Lebron James", "Steph Curry"]}
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
  }
}

export default Home;
