import React from "react"
import Nav from "react-bootstrap/Nav"

const TabNav = () => {
    return(
        <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link href="/home">Sports Betting</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Fantasy Sports</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Sports Analytics</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default TabNav;