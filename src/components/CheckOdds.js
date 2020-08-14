import React from 'react';
import TabNav from './TabNav';
import Dropdown from 'react-bootstrap/Dropdown'

const CheckOdds = () => {
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
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        </>
    )
}

export default CheckOdds;