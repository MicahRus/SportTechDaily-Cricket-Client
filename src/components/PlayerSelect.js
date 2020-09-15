import React from "react";
import Select, { createFilter } from "react-select";

import MenuList from "./MenuList";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class PlayerSelect extends React.Component {
  state = { playerOptions: [{ value: "test", label: "test" }] };

  componentDidMount() {
    this.setPlayerOptions();
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
    this.props.options.post2017Players.map((player) => {
      playerOptions.push({ value: player.playerid, label: player.player });
    });
    this.setState({ playerOptions });
  };

  renderButtons = () => {
    const customStyles = {
      container: (provided, state) => ({
        ...provided,

        margin: "10px 0px",
        // width: "40%",
      }),
    };
    return (
      <Row>
        <Col>
          <Select
            isOptionDisabled={(option) =>
              option.value === this.props.options.player1?.value ||
              option.value === this.props.options.player2?.value
            }
            filterOption={createFilter({ ignoreAccents: false })}
            components={{ MenuList }}
            styles={customStyles}
            options={this.state.playerOptions}
            onChange={(e) => this.props.playerSelectClickHandler("player1", e)}
          ></Select>
        </Col>
        <Col>
          <Select
            isOptionDisabled={(option) =>
              option.value === this.props.options.player1?.value ||
              option.value === this.props.options.player2?.value
            }
            filterOption={createFilter({ ignoreAccents: false })}
            styles={customStyles}
            options={this.state.playerOptions}
            components={{ MenuList }}
            onChange={(e) => this.props.playerSelectClickHandler("player2", e)}
          ></Select>
        </Col>
      </Row>
    );
  };

  render() {
    return this.renderButtons();
  }
}

export default PlayerSelect;
