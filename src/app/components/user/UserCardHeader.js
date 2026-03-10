import React from "react"
import { useSelector } from "react-redux"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Figure from "react-bootstrap/Figure"
import Badge from "react-bootstrap/Badge"
import ProgressBar from "react-bootstrap/ProgressBar"
import { GiSpellBook, GiStarMedal } from "react-icons/gi"
import "./UserCardHeader.css"
import UserInfos from "./UserInfos"
import UserLeveling from "./UserLeveling"

/* 
below is bullshit
level 1 0-100 => 100increment 0
level 2 100-200 => 100increment 0
level 3 200-300 => 100increment 0

level 4 300-500 => 200increment 
level 5 500-700 => 200increment
level 6 700-900 => 200increment

level 7 900-1200 => 300increment
level 8 1200-1600 => 300increment
level 9 1600-2100 => 300increment

level 10 2100-2700 => 600 increment + 0
level 11 2700-3400 => 600 increment + 100
level 12 3400-4200 => 600 increment + 200

level 13 4200-5000 => 800 increment + 0
level 14 5000-5900 => 800 increment + 100
level 15 6200-5000 => 800 increment + 200
*/
export const getXPNeededStupid = (level) => {
    let xpNeeded = 0

    let incrementFactor = 1
    const incrementStep = 3
    for (let i = 1; i <= level; i++) {
        xpNeeded += 100 * incrementFactor
        if (i % incrementStep == 0) {
            incrementFactor++
        }
    }

    return xpNeeded
}


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
                        roundedCircle
                        width={128}
                        height={128}
                        alt="User Avatar"
                        src={avatarUrl || `https://app.warera.io/images/avatars/userAvatarPlaceholder.png?v=2`}
                    />
                    <Figure.Caption>
                        <cite>{description}</cite>
                    </Figure.Caption>
                </Figure>
            </Col>
            <Col>
                <span className="user-username">
                    <Badge pill><GiStarMedal />{level}</Badge>
                    <span className={isBanned && `banned`}><img src={`https://app.warera.io/images/flags/${country?.code}.svg?v=16`} alt={country?.name}/> {username}</span>
                </span>
                <UserInfos {...infos} countryName={country?.name} isBanned={isBanned} />
                <hr />
                <UserLeveling {...leveling} />
                <GiSpellBook /> {`${availableSkillPoints}/${totalSkillPoints}`}
                {/* <ProgressBar now={leveling.totalXp} /> */}
            </Col>

        </Row>

    )

}


export default UserCardHeader