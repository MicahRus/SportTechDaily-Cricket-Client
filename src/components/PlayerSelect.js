import React from "react";
import Select from "react-select";

class PlayerSelect extends React.Component {
  state = { playerOptions: [{ value: "test", label: "spagheet" }] };

  componentDidMount() {
    this.setPlayerOptions();
  }

  setPlayerOptions = () => {
    console.log(this.props.options);

    let playerOptions = [];
    this.props.options.map((player) => {
      playerOptions.push({ value: player.playerid, label: player.player });
    });
    console.log(playerOptions);
    this.setState({ playerOptions }, () => {
      console.log("state is set");
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Select options={this.state.playerOptions}></Select>
      </div>
    );
  }
}

export default PlayerSelect;
