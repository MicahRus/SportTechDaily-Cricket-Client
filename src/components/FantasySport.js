import React from "react";
import { Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";

class FantasySport extends React.Component {
  state = {
    redirect: null,
    dfs_summary: [],
  };

  componentDidUpdate() {
    console.log("true");
    console.log(this.state);
  }

  componentDidMount() {
    this.getDfsData();
  }

  getDfsData = async () => {
    console.log("THIS IS A LOG");
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/dfs_summary`
    );
    const data = await response.json();
    console.log("Here is the data:", data);
    this.setState({ dfs_summary: data.rows });
  };

  renderDfsTable() {
    return (
      <div className="tableFixHead">
        <Table bordered striped hover>
          <thead>
            <tr>
              <th>Player</th>
              <th>Expected Minutes</th>
              <th>Price/Pred (%)</th>
              <th>OS Prev Rd</th>
              <th>DS Price</th>
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
