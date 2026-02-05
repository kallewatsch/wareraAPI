import React from "react"
import Nav from "react-bootstrap/Nav"

const routes = [
    "search",
    "companies",
    "events",
    "governments",
    "regions",
    "battles",
    "rounds",
    "battlerankings",
    "prices",
    "tradingorders",
    "itemoffers",
    "workoffers",
    "rankings",
    "gameconfig",
    "users",
    "articles",
    "mus",
    "transactions",
    "upgrade",
    "workers"
]

export const Navigation = () => {
    return (
        <Nav>
            <Nav.Item><Nav.Link href="/">freemus</Nav.Link></Nav.Item>
            {routes.map((route, i) => <Nav.Item key={`route-${i}`}><Nav.Link href={`#${route}`}>{route}</Nav.Link></Nav.Item>)}
        </Nav>
    )
}

export default Navigation