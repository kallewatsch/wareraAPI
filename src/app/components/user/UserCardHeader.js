import React from "react"
import { useSelector } from "react-redux"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Figure from "react-bootstrap/Figure"
import Badge from "react-bootstrap/Badge"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ProgressBar from "react-bootstrap/ProgressBar"
import { GiExitDoor, GiPerson, GiSpellBook, GiStarMedal } from "react-icons/gi"
import "./UserCardHeader.css"
import UserInfos from "./UserInfos"
import UserLeveling from "./UserLeveling"
import { Button, ListGroup, ListGroupItem, OverlayTrigger, Tooltip } from "react-bootstrap"
import FigureWithContainer from "../util/FigureWithContainer"


export const UserCardHeader = (props) => {

    const { _id, username, avatarUrl, leveling, infos, countryId, militaryRank, ...otherProps } = props
    //console.log({ props })

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

    const tooltipUserLevelId = "tooltipUserLevel"
    const tooltipUserLevelTxt = "User Level"
    const tooltipUserMilRankId = "tooltipMilitaryRank"
    const tooltipUserMilRankTxt = "User Military Rank"

    const renderTooltip = (_props, id, txt) => <Tooltip id={id} {..._props}>{txt}</Tooltip>

    return (
        <>
            <FigureWithContainer
                figureSrc={avatarUrl || `https://app.warera.io/images/avatars/userAvatarPlaceholder.png?v=2`}
                figureText={description}
            >
                <ListGroup horizontal className="user-username">
                    <ListGroupItem>
                        <Button href={`https://app.warera.io/user/${_id}`} target="_blank"><GiExitDoor size="2em" />Visit Profile</Button>
                    </ListGroupItem>
                    <ListGroupItem>
                        <OverlayTrigger overlay={(_props) => renderTooltip(_props, tooltipUserLevelId, tooltipUserLevelTxt)}>
                            <span><GiPerson size="2em" />{level || 0}</span>
                        </OverlayTrigger>
                    </ListGroupItem>
                    <ListGroupItem>
                        <span className={isBanned && `banned`}>
                            <img src={`https://app.warera.io/images/flags/${country?.code}.svg?v=16`} alt={country?.name} /> {username}
                        </span>
                    </ListGroupItem>
                    <ListGroupItem>
                        <OverlayTrigger overlay={(_props) => renderTooltip(_props, tooltipUserMilRankId, tooltipUserMilRankTxt)}>
                            <span><GiStarMedal size="2em" />{militaryRank || 0}</span>
                        </OverlayTrigger>
                    </ListGroupItem>
                    {infos && <ListGroupItem>
                        <UserInfos {...infos} countryName={country?.name} isBanned={isBanned} />
                    </ListGroupItem>}
                </ListGroup>
                {/* <hr />
                <UserLeveling {...leveling} />
                <GiSpellBook /> {`${availableSkillPoints}/${totalSkillPoints}`} */}
            </FigureWithContainer>
            {/* <Row>
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
                        <ListGroup horizontal>
                            <ListGroupItem>
                                <Button href={`https://app.warera.io/user/${_id}`} target="_blank"><GiExitDoor size="2em" />Visit Profile</Button>
                            </ListGroupItem>
                            <ListGroupItem>
                                <OverlayTrigger overlay={(_props) => renderTooltip(_props, tooltipUserLevelId, tooltipUserLevelTxt)}>
                                    <span><GiPerson size="2em" />{level || 0}</span>
                                </OverlayTrigger>
                            </ListGroupItem>
                            <ListGroupItem>
                                <span className={isBanned && `banned`}>
                                    <img src={`https://app.warera.io/images/flags/${country?.code}.svg?v=16`} alt={country?.name} /> {username}
                                </span>
                            </ListGroupItem>
                            <ListGroupItem>
                                <OverlayTrigger overlay={(_props) => renderTooltip(_props, tooltipUserMilRankId, tooltipUserMilRankTxt)}>
                                    <span><GiStarMedal size="2em" />{militaryRank || 0}</span>
                                </OverlayTrigger>
                            </ListGroupItem>
                            {infos && <ListGroupItem>
                                <UserInfos {...infos} countryName={country?.name} isBanned={isBanned} />
                            </ListGroupItem>}
                        </ListGroup>
                    </span>
                    <hr />
                    <UserLeveling {...leveling} />
                    <GiSpellBook /> {`${availableSkillPoints}/${totalSkillPoints}`}
                </Col>
            </Row > */}
        </>
    )

}


export default UserCardHeader