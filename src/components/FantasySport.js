import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Row, Col, Button, Table } from "react-bootstrap";

class FantasySport extends React.Component {
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
                <h1>Fantasy Sports DFS</h1>
            </div>
            <div>
                <Form>
                    <Form title="match-select">
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Match</Form.Label>
                                    <Form.Control as="select">
                                        <option></option>
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
                                        <option>DFS</option>
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
                    <th>DFS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Player Name</td>
                    <td>Table cell</td>
                  </tr>
                  <tr>
                    <td>Player Name</td>
                    <td>Table cell</td>
                  </tr>
                  <tr>
                    <td>Player Name</td>
                    <td>Table cell</td>
                  </tr>
                </tbody>
              </Table>
            </div>
        </div>
    )
  }
}

export default FantasySport;