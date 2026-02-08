import React from "react"
import Nav from "react-bootstrap/Nav"

const routes = [
    "freemus",
    "search",
    "companies",
    "countries",
    "events",
    "governments",
    "regions",
    "users",
    /* "battles",
    "rounds",
    "battlerankings", */
    "prices",
    "tradingorders",
    "itemoffers",
    "mus",
    "warplaner"
]

const disabledRoutes = [
    "battles",
    "rounds",
    "battlerankings",
    "workoffers",
    "rankings",
    "gameconfig",
    "articles",
    "transactions",
    "upgrade",
    "workers"
]

export const Navigation = () => {
    return (
        <Nav>
            <Nav.Item><Nav.Link href="/">home - not working</Nav.Link></Nav.Item>
            {routes.map((route, i) => <Nav.Item key={`route-${i}`}><Nav.Link href={`#${route}`}>{route}</Nav.Link></Nav.Item>)}
            {disabledRoutes.map((route, i) => <Nav.Item key={`disabledroute-${i}`}><Nav.Link href={`#${route}`} disabled>{route}</Nav.Link></Nav.Item>)}
            <Nav.Item></Nav.Item>
        </Nav>
    )
}

export default Navigation