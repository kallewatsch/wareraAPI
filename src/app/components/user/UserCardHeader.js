import React from "react"
import { useSelector } from "react-redux"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Figure from "react-bootstrap/Figure"
import Badge from "react-bootstrap/Badge"
import ProgressBar from "react-bootstrap/ProgressBar"
import { GiSpellBook } from "react-icons/gi"
import "./UserCardHeader.css"


export const UserCardHeader = (props) => {

    const { username, avatarUrl, leveling, infos, otherProps } = props

    const {
        isPremium,
        premiumMonthsCount,
        colorScheme,
        font,
        description,
        vicePresidentOf,
    } = infos || {}

    const {
        level,
        totalXp,
        dailyXpLeft,
        availableSkillPoints,
        spentSkillPoints,
        totalSkillPoints,
        freeReset
    } = leveling || {}

    const { config } = useSelector(state => state.app)

    return (
        <Row>
            <Col xs={4} lg={2}>
                <Figure>
                    <Figure.Image
                        fluid
                        width={128}
                        height={128}
                        alt="User Avatar"
                        src={avatarUrl}
                    />
                    <Figure.Caption>
                        <cite>{description}</cite>
                    </Figure.Caption>
                </Figure>
            </Col>
            <Col>
                <span className="user-username"><Badge pill>{leveling.level}</Badge> {username} {infos?.isBanned && '(banned user)'}</span>
                <hr />
                <GiSpellBook /> {`${leveling.availableSkillPoints}/${leveling.totalSkillPoints}`}
                {/* <ProgressBar now={leveling.totalXp} /> */}
            </Col>

        </Row>

    )

}


export default UserCardHeader