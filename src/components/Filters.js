import React from "react";
import { Form, Col, Button, ButtonGroup, Row } from "react-bootstrap";

import Select from "react-select";

class StatsCheckbox extends React.Component {
  renderCheckboxes = () => {
    const stats = [
      ["Runs", "Batting average"],
      ["Batting Strike Rate", "Ball Per Boundary"],
      ["Power Play Strike Rate", "Death Strike Rate"],
      ["Dot Ball Percentage", "Wickets"],
      ["Bowling Average", "Bowling Economy Rate"],
      ["Catches", "Run Outs"],
      ["Death Overs Economy", "6s"],
      ["Power Play Economy", "4s"],
      ["Catchers", "Stumpings"],
    ];

    return stats.map((stat) => {
      return (
        <div>
          <Form.Row>
            <Col>
              <Form.Check inline label={stat[0]} id={stat[0]} type="checkbox" />
            </Col>
            <Col>
              <Form.Check inline label={stat[1]} id={stat[1]} type="checkbox" />
            </Col>
          </Form.Row>
        </div>
      );
    });
  };

  renderTemplateButtons = () => {
    return (
      <div className="graph-control-item-group">
        <ButtonGroup size="sm" type="radio">
          <Button className="template-button" variant="outline-secondary">
            {" "}
            Bowler
          </Button>
          <Button className="template-button" variant="outline-secondary">
            {" "}
            Batsman
          </Button>
          <Button className="template-button" variant="outline-secondary">
            {" "}
            Wicket Keeper
          </Button>
          <Button className="template-button" variant="outline-secondary">
            {" "}
            All Rounder
          </Button>
        </ButtonGroup>
      </div>
    );
  };

  renderVenueSelect = () => {
    const options = [
      { label: "Venue1", value: "Venue1" },
      { label: "Venue2", value: "Venue2" },
      { label: "Venue3", value: "Venue3" },
      { label: "Venue4", value: "Venue4" },
      { label: "Venue5", value: "Venue5" },
      { label: "Venue6", value: "Venue6" },
    ];
    return (
      <div className="graph-control-item-group">
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

  renderSwitch = () => {
    return (
      <div className="graph-control-item-group">
        <Form.Check type="switch" id="custom-switch" label="Domestic Matches" />
      </div>
    );
  };

  renderLeagueSelect = () => {
    return (
      <div className="control-item">
        <Select
          name="leagues"
          className="basic-select"
          classNamePrefix="select"
        />
      </div>
    );
  };

  render() {
    return (
      <Form>
        {this.renderCheckboxes()}
        {this.renderTemplateButtons()}
        {this.renderVenueSelect()}
        {this.renderLeagueSelect()}
        {this.renderSwitch()}
      </Form>
    );
  }
}

export default StatsCheckbox;
