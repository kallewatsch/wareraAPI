import React, { useState } from "react"
import Card from "react-bootstrap/Card"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import UserRankings from "./UserRankings"
import UserSkills from "./UserSkills"
import SimpleStats from "../SimpleStats"
import UserInventory from "./UserInventory"
import UserCardHeader from "./UserCardHeader"
import UserDates from "./UserDates"


export const getExpectedDamage = (skills) => {
    const {
        attack, precision, criticalChance, criticalDamages, useEquipment
    } = skills

    const key = useEquipment ? "total" : "value"

    const { _attack, _precision, _criticalDamages, _criticalChance } = {
        _attack: attack[key] || 0,
        _precision: precision[key] || 0,
        _criticalDamages: criticalDamages[key] || 0,
        _criticalChance: criticalChance[key] || 0
    }

    const avgDmgMiss = (_attack / 2) * (_precision / 100)
    const avgHit = _attack * (_precision / 100)
    const avgCrit = (_attack + (_criticalDamages / 100) * _attack) * (_criticalChance / 100)

    return avgDmgMiss + avgHit + avgCrit

}


export const User = (props) => {
    const {
        username,
        avatarUrl,
        rankings,
        skills,
        dates,
        leveling,
        infos,
        ...otherProps
    } = props

    const [key, setKey] = useState('skills');

    const userCardHederProps = {
        avatarUrl, username, leveling, infos, otherProps
    }

    const expectedDmg = getExpectedDamage({ useEquipment: true, ...skills })

    return (
        <Card bg={infos?.isBanned ? 'danger' : undefined}>
            <Card.Header>
                <UserCardHeader {...userCardHederProps} />
                expectedDmg per attack: {expectedDmg}
            </Card.Header>
            {/* <Card.Img src={avatarUrl} /> */}
            <Card.Body>
                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="other" title="Other">
                        <SimpleStats {...otherProps} />
                    </Tab>
                    <Tab eventKey="dates" title="Dates">
                        <UserDates dates={dates} />
                    </Tab>
                    <Tab eventKey="leveling" title="Leveling">
                        <SimpleStats {...leveling} />
                    </Tab>
                    <Tab eventKey="skills" title="Skills">
                        <UserSkills {...skills} />
                    </Tab>
                    <Tab eventKey="rankings" title="Rankings">
                        <UserRankings {...rankings} />
                    </Tab>
                    <Tab eventKey="inventory" title="Inventory">
                        <UserInventory userId={props._id} />
                    </Tab>
                </Tabs>
            </Card.Body>
            <Card.Footer></Card.Footer>
        </Card>
    )

}

export default User