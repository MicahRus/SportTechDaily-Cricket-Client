import React from "react";
import { Redirect } from "react-router-dom";
import {Table, Form, Row, Col} from "react-bootstrap";
import Select from "react-select";

class SportsBetting extends React.Component {

    state = { 
      redirect: null,
      market: null,
      match: null,
      ats_summary: [],
    };

    componentDidUpdate() {
        console.log("true");
        console.log(this.state);
    }
    componentDidMount() {
      this.getAtsData();
    }

    // Retrieves data from ats_summary table
    getAtsData = async () => {
      console.log("THIS IS A LOG")
      const response = await fetch("http://localhost:3001/ats_summary");
      const data = await response.json();
      console.log("Here is the data:", data);
      this.setState({ ats_summary: data.rows });
    };

    // marketButtonSelectHandler = (event) => {
    //   let marketOption = event.target.value;

    //   this.
    // }

    matchButtonSelectHandler = (event) => {
      let matchName = event.target.value;

      this.getAtsData(matchName);
    };
    
    // Retrieves player odds data, by match
    getPlayersByMatch = async (matchName) => {
      const response = await fetch(`http://localhost:3001/ats_summary/match?matchName=${matchName}`);
      const data = await response.json();
      this.setState({ match_names: data.rows })
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }
        return (
            <div>
                <div>
                    <h2>Check the Odds</h2>
                </div>
                <div>
                  <Select
                    options={this.state.options}
                    onChange={(e) => {
                      this.setState({
                        barStat1: [e.value],
                        refreshBarChart: true,
                      });
                    }}
                    placeholder={this.state.barStat1[0]}
                  />
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
                              <option value="dtsOption">
                                DTS
                              </option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </Form> */}
                  <Form title="match">
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
                  </Form>
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
                        <th>ATS Empirical</th>
                        <th>ATS Model</th>
                        <th>Team</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
            </div>
        )
    }
}

export default SportsBetting;
