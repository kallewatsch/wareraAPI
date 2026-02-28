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

    return (
        <Card bg={infos?.isBanned ? 'danger' : undefined}>
            <Card.Header>
                <UserCardHeader {...userCardHederProps} />
                
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