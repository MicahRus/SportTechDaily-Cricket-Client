import React from "react";
import Select from "react-select";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class PlayerSelect extends React.Component {
  state = { playerOptions: [{ value: "test", label: "test" }] };

  componentDidMount() {
    this.setPlayerOptions();
  }

  componentDidUpdate() {
    console.log(this.props);
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

        margin: "5px",
        // width: "40%",
      }),
    };
    return (
      <div>
        {/* <ToggleButtonGroup
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
        </ToggleButtonGroup> */}
        <Row>
          <Col>
            <Select
              styles={customStyles}
              options={this.state.playerOptions}
            ></Select>
          </Col>
          <Col>
            <Select
              styles={customStyles}
              options={this.state.playerOptions}
            ></Select>
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    return this.renderButtons();
  }
}

export default PlayerSelect;
