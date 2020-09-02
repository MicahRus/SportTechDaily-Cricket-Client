import React from "react";
import { Redirect } from "react-router-dom";
import { Table, OverlayTrigger } from "react-bootstrap";

import OwnershipPopover from "./Popovers/Ownership";
import PredictedScorePopover from "./Popovers/PredictedScore";
import PricePredPopover from "./Popovers/PricePred";

class FantasySport extends React.Component {
  state = {
    redirect: null,
    dfs_summary: [],
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  componentDidMount() {
    this.getDfsData();
  }

  getDfsData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/dfs_summary`
    );
    const data = await response.json();
    this.setState({ dfs_summary: data.rows });
  };

  renderDfsTable() {
    return (
      <div className="tableFixHead">
        <Table bordered striped hover>
          <thead>
            <tr>
              <th>Player</th>
              <th>Draftstars Price</th>
              <OverlayTrigger
                placement="bottom"
                trigger={["focus", "hover"]}
                overlay={PredictedScorePopover}
              >
                <th>Predicted Score</th>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                trigger={["focus", "hover"]}
                overlay={PricePredPopover}
              >
                <th>Price/Pred (%)</th>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                trigger={["focus", "hover"]}
                overlay={OwnershipPopover}
              >
                <th>Ownership (%) Previous Round</th>
              </OverlayTrigger>
              <th>Match</th>
              <th>Team</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {this.state.dfs_summary.map((item) => {
              return (
                <tr>
                  <td>{item.player}</td>
                  <td>{Math.round(item.minutes)}</td>
                  <td>{Math.round(item.price_pred)}</td>
                  <td>{Math.round(item.os_prev)}</td>
                  <td>{Math.round(item.ds_price)}</td>
                  <td>{item.match_name}</td>
                  <td>{item.team}</td>
                  <td>{item.pos}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <div>
          <h1>Daily Fantasy Sports</h1>
        </div>
        <div>{this.renderDfsTable()}</div>
      </div>
    );
  }
}

export default FantasySport;
