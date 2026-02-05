import React from "react"
import Nav from "react-bootstrap/Nav"

const routes = [
    "search",
    "companies",
    "countries",
    "events",
    "governments",
    "regions",
    /* "battles",
    "rounds",
    "battlerankings", */
    "prices",
    "tradingorders",
    "itemoffers"
]

const disabledRoutes = [
    "battles",
    "rounds",
    "battlerankings",
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
            {disabledRoutes.map((route, i) => <Nav.Item key={`disabledroute-${i}`}><Nav.Link href={`#${route}`} disabled>{route}</Nav.Link></Nav.Item>)}
            <Nav.Item></Nav.Item>
        </Nav>
    )
}

export default Navigation