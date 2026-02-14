import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"
import Ranking from "../ranking/Ranking"


export const UserRankings = (props) => {

    const {
        userDamages,
        weeklyUserDamages,
        userWealth,
        userLevel,
        userReferrals,
        userTerrain,
        userCasesOpened,
        userBounty
    } = props

    return (
        <>
            <Row>
                <Col><Ranking {...userDamages} title="Damages" /></Col>
                <Col><Ranking {...weeklyUserDamages} title="Weekly Damages" /></Col>
                <Col><Ranking {...userWealth} title="Wealth" /></Col>
                <Col><Ranking {...userLevel} title="Level" /></Col>

            </Row>
            <Row>
                <Col><Ranking {...userReferrals} title="Referrals" /></Col>
                <Col><Ranking {...userTerrain} title="Terrain" /></Col>
                <Col><Ranking {...userCasesOpened} title="Cases Opened" /></Col>
                <Col><Ranking {...userBounty} title="Bounty" /></Col>
            </Row>
        </>
    )

}


export default UserRankings