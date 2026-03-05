import React from "react"
import { useSelector } from "react-redux"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Figure from "react-bootstrap/Figure"
import Badge from "react-bootstrap/Badge"
import ProgressBar from "react-bootstrap/ProgressBar"
import { GiSpellBook } from "react-icons/gi"
import "./UserCardHeader.css"
import UserInfos from "./UserInfos"


export const UserCardHeader = (props) => {

    const { username, avatarUrl, leveling, infos, countryId, otherProps } = props

    const {
        isBanned,
        isPremium,
        premiumMonthsCount,
        premiumGiftsCount,
        description,
        presidentOf,
        vicePresidentOf,
        minOfDefenseOf,
        minOfEconomyOf,
        minOfForeignAffairsOf,
        congressMemberOf,
        colorScheme,
        font,
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

    const { countries } = useSelector(state => state.app)
    const country = countries.find(country => country._id == countryId)


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
                <span className="user-username">
                    <Badge pill>{level}</Badge> {username} <img src={`https://app.warera.io/images/flags/${country?.code}.svg?v=16`}/>{isBanned && '(banned user)'}
                </span>
                <UserInfos {...infos} countryName={country?.name}/>
                <hr />
                <GiSpellBook /> {`${availableSkillPoints}/${totalSkillPoints}`}
                {/* <ProgressBar now={leveling.totalXp} /> */}
            </Col>

        </Row>

    )

}


export default UserCardHeader