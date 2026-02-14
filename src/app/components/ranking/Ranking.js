import React from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { BsFillStarFill, BsRocketTakeoffFill, BsBarChartFill } from "react-icons/bs"
import "./Ranking.css"

export const fooValue = (value) => {
    if (!value) {
        return "-"
    }
    const intVal = parseInt(value)
    if (intVal != 'NaN') {
        return Math.round(intVal)
    }
    return value
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
export const Ranking = props => {
    const { value, tier, rank, title } = props
    return (
        <>
            <h5>{title}</h5>
            <ListGroup horizontal>
                <ListGroup.Item><BsBarChartFill />{fooValue(value)}</ListGroup.Item>
                <ListGroup.Item><BsRocketTakeoffFill />{fooRank(rank)}</ListGroup.Item>
                <ListGroup.Item><BsFillStarFill className={`ranking-${tier}`}/>{tier || '-'}</ListGroup.Item>
            </ListGroup>
        </>
    )
}

export default Ranking