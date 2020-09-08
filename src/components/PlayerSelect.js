import React from "react";
import Select from "react-select";

import {
  ToggleButton,
  ToggleButtonGroup,
  ButtonToolbar,
} from "react-bootstrap/";

class PlayerSelect extends React.Component {
  state = { playerOptions: [{ value: "test", label: "test" }] };

  componentDidMount() {
    this.setPlayerOptions();
  }

  componentDidUpdate() {
    console.log(this.props);
    console.log("hi");
  }

  setPlayerOptions = () => {
    let playerOptions = [];
    let key = null;
    switch (this.props.options.playerType) {
      default:
        key = "allBatsmen";
        break;
      case "bowler":
        key = "allBowlers";
        break;
      case "allrounder":
        key = "allAllRounders";
        break;
      case "wicketkeeper":
        key = "allWicketKeepers";
        break;
    }
    this.props.options[key].map((player) => {
      playerOptions.push({ value: player.playerid, label: player.player });
    });
    this.setState({ playerOptions });
  };

  renderButtons = () => {
    const customStyles = {
      container: (provided, state) => ({
        ...provided,

        marginTop: "5px",
      }),
    };
    return (
      <div>
        <ToggleButtonGroup
          value={this.props.options.playerType}
          name="radio"
          onChange={(value) => {
            this.props.clickHandler(value);
            this.setState({ getNewProps: true }, () => {
              this.setPlayerOptions();
            });
          }}
        >
          <ToggleButton variant="outline-secondary" value="batsman">
            Batsman
          </ToggleButton>
          <ToggleButton variant="outline-secondary" value="bowler">
            Bowler
          </ToggleButton>
          <ToggleButton variant="outline-secondary" value="allrounder">
            AllRounder
          </ToggleButton>
          <ToggleButton variant="outline-secondary" value="wicketKeeper">
            WicketKeeper
          </ToggleButton>
        </ToggleButtonGroup>
        <Select
          styles={customStyles}
          options={this.state.playerOptions}
        ></Select>
      </div>
    );
  };

  render() {
    return this.renderButtons();
  }
}

export default PlayerSelect;
