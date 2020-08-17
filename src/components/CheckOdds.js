import React from 'react';
import TabNav from './TabNav';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import atsData from '../data/ats_summary_data'

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
      <>
        <div>
          <h1>Check the Odds</h1>
        </div>
        <div>
          <TabNav />
        </div>
        <div>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                Match
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Sydney Roosters vs Melbourne Storm</Dropdown.Item>
                    <Dropdown.Item>Another action</Dropdown.Item>
                    <Dropdown.Item>Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        <div>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                Market
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>ATS</Dropdown.Item>
                    <Dropdown.Item>FTS</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        <div>
        <Button variant="success">Go!</Button>{' '}
        </div>
        </>
    )

}

export default CheckOdds;
