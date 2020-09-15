import React from "react";
import { Form, Col, Button, ButtonGroup, Row } from "react-bootstrap";

import Select, { createFilter } from "react-select";
import MenuList from "./MenuList";

class Filters extends React.Component {
  renderCheckboxes = () => {
    const stats = [
      ["Runs", "Batting Average"],
      ["Batting Strike Rate", "Balls Per Boundary"],
      ["Power Play Strike Rate", "Death Strike Rate"],
      ["Dot Ball Percentage", "Wickets"],
      ["Bowling Average", "Bowling Economy Rate"],
      ["Catches", "Run Outs"],
      ["Death Overs Economy Rate", "4s"],
      ["Power Play Economy Rate", "6s"],
      ["Catchers", "Stumpings"],
    ];

    return stats.map((stat) => {
      return (
        <div>
          <Form.Row>
            <Col>
              <Form.Check
                onChange={this.props.statCheckboxClickHandler}
                checked={this.props.selectedStats.includes(stat[0])}
                inline
                label={stat[0]}
                id={stat[0]}
                type="checkbox"
              />
            </Col>
            <Col>
              <Form.Check
                onChange={this.props.statCheckboxClickHandler}
                checked={this.props.selectedStats.includes(stat[1])}
                inline
                label={stat[1]}
                id={stat[1]}
                type="checkbox"
              />
            </Col>
          </Form.Row>
        </div>
      );
    });
  };

  renderTemplateButtons = () => {
    return (
      <div className="graph-control-item-group">
        <ButtonGroup
          onClick={this.props.playerTemplateClickHandler}
          size="sm"
          type="radio"
        >
          <Button className="template-button" variant="outline-secondary">
            Batsman
          </Button>
          <Button className="template-button" variant="outline-secondary">
            Bowler
          </Button>
          <Button className="template-button" variant="outline-secondary">
            Wicket Keeper
          </Button>
          <Button className="template-button" variant="outline-secondary">
            All Rounder
          </Button>
        </ButtonGroup>
      </div>
    );
  };

  renderVenueSelect = () => {
    let options = [];
    this.props.venues.map((venue) => {
      options.push({ label: venue.venue, value: venue.venueid });
    });

    return (
      <div className="graph-control-item-group">
        <Select
          filterOption={createFilter({ ignoreAccents: false })}
          components={{ MenuList }}
          isMulti
          closeMenuOnSelect={false}
          placeholder="Venues"
          name="venues"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    );
  };

  renderDomesticCheckboxes = () => {
    return (
      <div className="graph-control-item-group">
        <Col>
          <Form.Check
            onChange={this.props.competitionClickHandler}
            defaultChecked={true}
            checked={this.props.competition.includes("domestic")}
            inline
            type="switch"
            id="domestic-switch"
            label="Domestic Matches"
            value="domestic"
          />
          <Form.Check
            onChange={this.props.competitionClickHandler}
            defaultChecked={true}
            checked={this.props.competition.includes("international")}
            inline
            type="switch"
            id="international-switch"
            label="International Matches"
            value="international"
          />
        </Col>
      </div>
    );
  };

  renderLeagueSelect = () => {
    let options = [];

    this.props.leagues.map((league) => {
      options.push({ label: league.League, value: league.LeagueID });
    });

    return (
      <div className="control-item">
        <Select
          filterOption={createFilter({ ignoreAccents: false })}
          components={{ MenuList }}
          isMulti
          closeMenuOnSelect={false}
          name="leagues"
          placeholder="Leagues"
          options={options}
          className="basic-select"
          classNamePrefix="select"
          hideSelectedOptions={true}
          onChange={this.props.leagueClickHandler}
        />
      </div>
    );
  };

  render() {
    return (
      <Form>
        {this.renderDomesticCheckboxes()}
        {this.renderLeagueSelect()}
        {this.renderTemplateButtons()}
        {this.renderCheckboxes()}
        {/* {this.renderVenueSelect()} */}
      </Form>
    );
  }
}

export default Filters;
