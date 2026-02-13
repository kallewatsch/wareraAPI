import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"

import { BsFillStarFill, BsRocketTakeoffFill, BsBarChartFill } from "react-icons/bs"

export const fooValue = (data) => {
    if (!data || !data.value) {
        return "-"
    }
    const intVal = parseInt(data.value)
    if (intVal != 'NaN') {
        return Math.round(intVal)
    }
    return data.value
}

export const fooRank = rank => {
    // hell awaits me for sure
    return !rank ? '-' : rank == 3 ? `${rank}rd` : rank == 2 ? `${rank}nd` : rank == 1 ? `${rank}st` : rank
}

export const getTierColor = tier => {
    switch (tier) {
        case 'bronze':
            return '#CD7F32'
        case 'silver':
            return 'silver'
        case 'gold':
            return 'gold'
        case 'platinum':
            return '#E5E4E2'
        default:
            return 'gray'
    }

}
export const RankingData = props => {
    const { value, tier, rank, title } = props

    return (
        <>
            <h5>{title}</h5>
            <ListGroup horizontal>
                <ListGroup.Item><BsBarChartFill />{fooValue(value)}</ListGroup.Item>
                <ListGroup.Item><BsRocketTakeoffFill />{fooRank(rank)}</ListGroup.Item>
                <ListGroup.Item><BsFillStarFill style={{ color: getTierColor(tier) }} />{tier || '-'}</ListGroup.Item>
            </ListGroup>
        </>
    )
}

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
                {/* {row1.map((col, i) => <Col key={i}><RankingData {...col} /></Col>)} */}
                <Col><RankingData {...userDamages} title={`Damages`} /></Col>
                <Col><RankingData {...weeklyUserDamages} title="Weekly Damages" /></Col>
                <Col><RankingData {...userWealth} title="Wealth" /></Col>
                <Col><RankingData {...userLevel} title="Level" /></Col>

            </Row>
            <Row>
                <Col><RankingData {...userReferrals} title="Referrals" /></Col>
                <Col><RankingData {...userTerrain} title="Terrain" /></Col>
                <Col><RankingData {...userCasesOpened} title="Cases Opened" /></Col>
                <Col><RankingData {...userBounty} title="Bounty" /></Col>
            </Row>
            {/* <Row>
                {row2.map((col, i) => <Col key={i}><RankingData {...col} /></Col>)}
            </Row> */}
        </>
    )

}


export default UserRankings