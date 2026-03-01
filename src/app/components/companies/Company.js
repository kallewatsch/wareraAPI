import React from "react"
import { useSelector } from "react-redux"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"
import SimpleStats from "../SimpleStats"
import { Badge } from "react-bootstrap"
import { GiCardboardBox, GiGearHammer, GiPerson, GiClawHammer  } from "react-icons/gi";

export const foo = (datestring) => {
    const d = new Date(datestring)
    return `${d.toLocaleDateString()} | ${d.toLocaleTimeString()}`
}

export const Company = (props) => {

    const {
        user: userId,
        region: regionId,
        itemCode,
        name,
        concreteInvested,
        production,
        estimatedValue,
        isFull,
        workerCount,
        createdAt,
        updatedAt,
        activeUpgradeLevels,
        ...otherProps
    } = props

    const { storage, automatedEngine } = activeUpgradeLevels || {}

    const { regions, users } = useSelector(state => state.app)

    const regionName = regions?.[regionId]?.name
    const owner = users?.find(x => x._id == userId)?.username

    return (
        <Card>
            <Card.Header>
                {name}
                <Badge><GiPerson /> {owner}</Badge>
                <Badge>{regionName}</Badge>{itemCode}
                <Badge bg="dark" text="secondary"><GiCardboardBox /> {storage}</Badge>
                <Badge bg="dark" text="secondary"><GiGearHammer /> {automatedEngine}</Badge>
            </Card.Header>
            <Card.Body>
                Concrete Invested: {concreteInvested}<br />
                <GiClawHammer />Production: {production?.toFixed(2)}<br />
                Estimated Value: {estimatedValue?.toFixed(2)}<br />
                Is Full: {isFull ? 'yes' : 'no'}<br />
                Woker Count: {workerCount}<br />
                Founded: <Badge>{foo(createdAt)}</Badge><br />
                Updated: <Badge>{foo(updatedAt)}</Badge><br />
                <GiCardboardBox />Storage: {storage}<br />
                <GiGearHammer />Automated Engine: {automatedEngine}<br />
                {/* <SimpleStats {...otherProps} /> */}
            </Card.Body>
        </Card>
    )

}


export default Company