import React from "react";
import { Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";
import Select from "react-select";

import "./app.css";

class SportsBetting extends React.Component {
  state = {
    redirect: null,
    market: "ATS",
    match: null,
    ats_summary: [],
    fts_summary: [],
  };

  componentDidUpdate() {
    console.log(this.state);
  }
  componentDidMount() {
    this.getAtsData();
    this.getFtsData();
  }

  // Retrieves data from ats_summary table
  getAtsData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/ats_summary`
    );
    const data = await response.json();
    this.setState({ ats_summary: data.rows });
  };

  // Retrieves data from ats_summary table
  getAtsData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/ats_summary`
    );
    const data = await response.json();
    this.setState({ ats_summary: data.rows });
  };

  getFtsData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/fts_summary`
    );
    const data = await response.json();
    this.setState({ fts_summary: data.rows });
  };

  renderMarketSelect() {
    const marketOptions = [
      { value: "ATS", label: "Anytime Try Scorer" },
      { value: "FTS", label: "First Try Scorer" },
    ];
    return (
      <div>
        <Select
          options={marketOptions}
          onChange={(e) => {
            this.setState({
              market: e.value,
            });
          }}
          placeholder={marketOptions[0].label}
        />
      </div>
    );
  }

  renderAtsTable() {
    return (
      <div>
        <h2>Anytime Try Scorer Odds</h2>
      </div>
    );
  }

  styleHighestOdds = (item, highest) => {
    if (item === highest) return { backgroundColor: "lightGreen" };
  };

  stylePercentages = (item) => {
    if (item * 100 >= 125) {
      return { backgroundColor: "salmon" };
    } else if (item * 100 >= 100 && item * 100 <= 125) {
      return { backgroundColor: "yellow" };
    } else {
    }
  };

  renderAtsTable() {
    return (
      <div>
        <div>
          <h2>Anytime Try Scorer Odds</h2>
        </div>
        <div className="tableFixHead">
          <Table size="sm" bordered striped hover>
            <thead>
              <tr>
                <th>Player</th>
                <th>SB</th>
                <th>Beteasy</th>
                <th>Neds</th>
                <th>Pointsbet</th>
                <th>Topsport</th>
                <th>Highest</th>
                <th>ATS Historical</th>
                <th>ATS Model</th>
                <th>Highest/Historical (%)</th>
                <th>Highest/Model (%)</th>
                <th>Match</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {this.state.ats_summary.map((item) => {
                return (
                  <tr>
                    <td>{item.player}</td>
                    <td style={this.styleHighestOdds(item.sb, item.highest)}>
                      {item.sb}
                    </td>
                    <td
                      style={this.styleHighestOdds(item.beteasy, item.highest)}
                    >
                      {item.beteasy}
                    </td>
                    <td style={this.styleHighestOdds(item.neds, item.highest)}>
                      {item.neds}
                    </td>
                    <td
                      style={this.styleHighestOdds(
                        item.pointsbet,
                        item.highest
                      )}
                    >
                      {item.pointsbet}
                    </td>
                    <td
                      style={this.styleHighestOdds(item.topsport, item.highest)}
                    >
                      {item.topsport}
                    </td>
                    <td>{item.highest}</td>
                    <td>{item.ats_empirical}</td>
                    <td>{item.ats_model}</td>
                    <td style={this.stylePercentages(item.high_emp)}>
                      {Math.round(item.high_emp * 100)}
                    </td>
                    <td style={this.stylePercentages(item.high_mod)}>
                      {Math.round(item.high_mod * 100)}
                    </td>
                    <td>{item.match_name}</td>
                    <td>{item.team}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }

  renderFtsTable() {
    return (
      <div>
        <div>
          <h2>First Try Scorer Odds</h2>
        </div>
        <div className="tableFixHead">
          <Table size="sm" bordered striped hover>
            <thead>
              <tr>
                <th>Player</th>
                <th>SB</th>
                <th>Beteasy</th>
                <th>Neds</th>
                <th>Pointsbet</th>
                <th>Topsport</th>
                <th>Highest</th>
                <th>FTS Historical</th>
                <th>FTS Model</th>
                <th>Highest/Historical (%)</th>
                <th>Highest/Model (%)</th>
                <th>Match</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {this.state.fts_summary.map((item) => {
                return (
                  <tr>
                    <td>{item.player}</td>
                    <td style={this.styleHighestOdds(item.sb, item.highest)}>
                      {item.sb}
                    </td>
                    <td
                      style={this.styleHighestOdds(item.beteasy, item.highest)}
                    >
                      {item.beteasy}
                    </td>
                    <td style={this.styleHighestOdds(item.neds, item.highest)}>
                      {item.neds}
                    </td>
                    <td
                      style={this.styleHighestOdds(
                        item.pointsbet,
                        item.highest
                      )}
                    >
                      {item.pointsbet}
                    </td>
                    <td
                      style={this.styleHighestOdds(item.topsport, item.highest)}
                    >
                      {item.topsport}
                    </td>
                    <td>{item.highest}</td>
                    <td>{item.fts_empirical}</td>
                    <td>{item.fts_model}</td>
                    <td style={this.stylePercentages(item.high_emp)}>
                      {Math.round(item.high_emp * 100)}
                    </td>
                    <td style={this.stylePercentages(item.high_mod)}>
                      {Math.round(item.high_mod * 100)}
                    </td>
                    <td>{item.match_name}</td>
                    <td>{item.team}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    if (this.state.market === "ATS") {
      return (
        <>
          <div>{this.renderMarketSelect()}</div>
          <div>{this.renderAtsTable()}</div>
        </>
      );
    } else {
      return (
        <>
          <div>{this.renderMarketSelect()}</div>
          <div>{this.renderFtsTable()}</div>
        </>
      );
    }
  }
}

export default SportsBetting;
