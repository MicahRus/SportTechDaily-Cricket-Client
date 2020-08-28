import React from "react";
import { Redirect } from "react-router-dom";
import {Table, Form, Row, Col} from "react-bootstrap";
import Select from "react-select";

class SportsBetting extends React.Component {

    state = { 
      redirect: null,
      market: "ATS",
      match: null,
      ats_summary: [],
      fts_summary: [],
    };

    componentDidUpdate() {
        console.log("true");
        console.log(this.state);
    }
    componentDidMount() {
      this.getAtsData();
      this.getFtsData();
    }

    // Retrieves data from ats_summary table
    getAtsData = async () => {
      console.log("THIS IS A LOG")
      const response = await fetch("http://localhost:3001/ats_summary");
      const data = await response.json();
      console.log("Here is the data:", data);
      this.setState({ ats_summary: data.rows });
    };

    getFtsData = async () => {
      console.log("THIS IS A LOG")
      const response = await fetch("http://localhost:3001/fts_summary");
      const data = await response.json();
      console.log("Here is the FTS data:", data);
      this.setState({ fts_summary: data.rows });
    };

    // marketButtonSelectHandler = (event) => {
    //   let marketOption = event.target.value;

    //   this.market(marketOption);
    // };

    // matchButtonSelectHandler = (event) => {
    //   let matchName = event.target.value;

    //   this.getAtsData(matchName);
    // };
    
    // Retrieves player odds data, by match
    // getPlayersByMatch = async (matchName) => {
    //   const response = await fetch(`http://localhost:3001/ats_summary/match?matchName=${matchName}`);
    //   const data = await response.json();
    //   this.setState({ match_names: data.rows })
    // };

    renderMarketSelect() {
      const marketOptions = [
        { value: "ATS", label: "ATS"},
        { value: "FTS", label: "FTS"},
      ];
      return(
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
      )
    }
    
    renderAtsTable() {
        // if (this.state.redirect) {
        //     return <Redirect to={this.state.redirect} />;
        // }
        return (
            <div>
                <div>
                    <h2>ATS Odds</h2>
                </div>

                {/* <Form inline>
                  <Form title="market">
                    <Row>
                      <Col>
                        <Form.Label> Market </Form.Label>
                        <Form.Control
                          as="select"
                          custom
                          onChange={this.marketButtonSelectHandler}
                        >
                              <option value="atsOption">
                              ATS
                              </option>
                              <option value="ftsOption">
                                FTS
                              </option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </Form> */}
                  {/* <Form title="match">
                    <Row>
                      <Col>
                        <Form.Label> Match </Form.Label>
                        <Form.Control
                          as="select"
                          custom
                          onChange={this.matchButtonSelectHandler}
                        >
                          {this.state.match_names?.map((match) => {
                            return (
                              <option key={match.match_name} value={match.match_name}>
                                {match.match_name}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Col>
                    </Row>
                  </Form> */}
                {/* </Form> */}
                <div>
                  <Table striped bordered hover size="sm">
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
                        <th>Highest/Historical</th>
                        <th>Highest/Model</th>
                        <th>Match</th>
                        <th>Team</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.ats_summary.map((item) => {
                        return(
                          <tr>
                            <td>{item.player}</td>
                            <td>{item.sb}</td>
                            <td>{item.beteasy}</td>
                            <td>{item.neds}</td>
                            <td>{item.pointsbet}</td>
                            <td>{item.topsport}</td>
                            <td>{item.highest}</td>
                            <td>{item.ats_empirical}</td>
                            <td>{item.ats_model}</td>
                            <td>{item.high_emp}</td>
                            <td>{item.high_mod}</td>
                            <td>{item.match_name}</td>
                            <td>{item.team}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
            </div>
        )
    };

    renderFtsTable() {
      return (
          <div>
              <div>
                  <h2>FTS Odds</h2>
              </div>
              <div>
                <Table striped bordered hover size="sm">
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
                      <th>Highest/Historical</th>
                      <th>Highest/Model</th>
                      <th>Match</th>
                      <th>Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.fts_summary.map((item) => {
                      return(
                        <tr>
                          <td>{item.player}</td>
                          <td>{item.sb}</td>
                          <td>{item.beteasy}</td>
                          <td>{item.neds}</td>
                          <td>{item.pointsbet}</td>
                          <td>{item.topsport}</td>
                          <td>{item.highest}</td>
                          <td>{item.ats_empirical}</td>
                          <td>{item.ats_model}</td>
                          <td>{item.high_emp}</td>
                          <td>{item.high_mod}</td>
                          <td>{item.match_name}</td>
                          <td>{item.team}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
          </div>
      )
  }

    render() {
      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />;
    }
      if (this.state.market === "ATS") {
        return(
          <>
            <div>
              <h2>Check the Odds</h2>
            </div>
            <div>
              {this.renderMarketSelect()}
            </div>
            <div>
              {this.renderAtsTable()}
            </div>
          </>
        )
      } else {
        return(
          <>
            <div>
              <h2>Check the Odds</h2>
            </div>
            <div>
              {this.renderMarketSelect()}
            </div>
            <div>
              {this.renderFtsTable()}
            </div>
          </>
        )
      }
    }
}

export default SportsBetting;
