import React from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { BsFillStarFill, BsRocketTakeoffFill, BsBarChartFill } from "react-icons/bs"
import "./Ranking.css"
import { rankingValueToHumanReadable, rankingRankToHumanReadable } from "../../utils/arrayStuff"


export const Ranking = props => {
    const { value, tier, rank, title } = props
    return (
        <>
            <h5>{title}</h5>
            <ListGroup horizontal>
                <ListGroup.Item><BsBarChartFill />{rankingValueToHumanReadable(value)}</ListGroup.Item>
                <ListGroup.Item><BsRocketTakeoffFill />{rankingRankToHumanReadable(rank)}</ListGroup.Item>
                <ListGroup.Item><BsFillStarFill className={`ranking-${tier}`}/>{tier || '-'}</ListGroup.Item>
            </ListGroup>
        </>
    )
}

export default Ranking