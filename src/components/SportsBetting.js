import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Col, Row, Button, Table } from "react-bootstrap";
import atsData from '../data/ats_summary_data';

class CheckOdds extends React.Component {
    state = { redirect: null };

    componentDidUpdate() {
        console.log("true");
        console.log(this.state);
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }

        return (
            <div>
                <div>
                    <h1>Check the Odds</h1>
                </div>
                <div>
                    <Form>
                        <Form title="match-select">
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Match</Form.Label>
                                        <Form.Control as="select">
                                            <option>{atsData.match}</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                        <Form title="market-select">
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Market</Form.Label>
                                        <Form.Control as="select">
                                            <option>ATS</option>
                                            <option>FTS</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                        <Button>
                            Go!
                    </Button>
                    </Form>
                </div>
                <div>
                <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>SB</th>
                        <th>Beteasy</th>
                        <th>Pointsbet</th>
                        <th>Neds</th>
                        <th>Topsport</th>
                        <th>Highest</th>
                        <th>ATS Empirical</th>
                        <th>ATS Model</th>
                        <th>ATS Model</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Player Name</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                      </tr>
                      <tr>
                        <td>Player Name</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                      </tr>
                      <tr>
                        <td>Player Name</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
            </div>
        )
    }
}

export default CheckOdds;
