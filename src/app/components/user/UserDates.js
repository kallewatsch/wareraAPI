import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"
import Badge from "react-bootstrap/Badge"

export const foo = (datestring) => {
    const d = new Date(datestring)
    return `${d.toLocaleDateString()} | ${d.toLocaleTimeString()}`
}

export const UserDates = (props) => {

    const { dates } = props
    const { lastHiresAt, lastWorkOfferApplications, ...otherDates } = dates

    const bla = Object.keys(otherDates).map((key, i) => {
        return <ListGroup.Item key={i}>{key}: <Badge>{foo(otherDates[key])}</Badge></ListGroup.Item>
    })

    return (
        <Row>
            <Col>
                <h6>Stasi 2.0?!</h6>
                <ListGroup>
                    {bla}
                </ListGroup>
            </Col>
            <Col>
                <h6>Last Hires</h6>
                <ListGroup>
                    {lastHiresAt.map((x, i) => <ListGroup.Item key={i}>Hired: <Badge>{foo(x)}</Badge></ListGroup.Item>)}
                </ListGroup>
            </Col>
            <Col>
                <h6>Last Work Offers</h6>
                <ListGroup>
                    {lastWorkOfferApplications.map((x, i) => <ListGroup.Item key={i}>WorkOffer: <Badge>{foo(x)}</Badge></ListGroup.Item>)}
                </ListGroup>
            </Col>
        </Row>

    )

}


export default UserDates