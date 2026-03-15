import React from "react"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import { IconContext } from "react-icons"
import {
    GiDeadlyStrike,
    GiMachineGunMagazine,
    GiBulletImpacts,
    GiMedicalDrip,
    GiAlarmClock
} from "react-icons/gi"


export const UserExtended = (props) => {

    const {
        expDmg,
        expAttCost,
        canAttackTimes,
        availableDmg,
        foods,
        hoursUntilLastOnline
    } = props

    const food = "noFood"

    return (
        <Col>
            <IconContext.Provider value={{ size: "2em" }}>
                <ListGroup horizontal>
                    <ListGroupItem>
                        <GiBulletImpacts /> {expDmg.toFixed(1) || 0}
                    </ListGroupItem>
                    <ListGroupItem>
                        <GiMedicalDrip /> {expAttCost.toFixed(1) || 0}
                    </ListGroupItem>
                    <ListGroupItem>
                        <GiMachineGunMagazine /> {foods?.[food]?.canAttackTimes} (no food)
                    </ListGroupItem>
                    <ListGroupItem>
                        <GiDeadlyStrike /> {foods?.[food]?.availableDmg.toFixed(1) || 0}
                    </ListGroupItem>
                    <ListGroupItem>
                        <GiAlarmClock /> {hoursUntilLastOnline}
                    </ListGroupItem>
                </ListGroup>
            </IconContext.Provider>
        </Col>
    )

}


export default UserExtended