import React, { useState } from "react"
import Card from "react-bootstrap/Card"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import UserRankings from "./UserRankings"
import UserSkills from "./UserSkills"

export const User = (props) => {
    console.log("User", props)
    const {
        username,
        avatarUrl,
        rankings,
        skills
    } = props

    const [key, setKey] = useState('rankings');

    return (
        <Card>
            <Card.Header>
            </Card.Header>
            <Card.Img src={avatarUrl} />
            <Card.Body>
                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="home" title="Home">
                        Tab content for Home
                    </Tab>
                    <Tab eventKey="profile" title="Profile">
                        Tab content for Profile
                    </Tab>
                    <Tab eventKey="skills" title="Skills">
                        <UserSkills {...skills} />
                    </Tab>
                    <Tab eventKey="rankings" title="Rankings">
                        <UserRankings {...rankings} />
                    </Tab>
                    
                </Tabs>
            </Card.Body>
            <Card.Footer></Card.Footer>
            yo
        </Card>
    )

}

export default User