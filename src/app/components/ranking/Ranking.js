import React from "react"
import { BsFillStarFill, BsRocketTakeoffFill, BsBarChartFill } from "react-icons/bs"
import { rankingValueToHumanReadable, rankingRankToHumanReadable } from "../../utils/arrayStuff"
import "./Ranking.css"


export const Ranking = props => {
    const { value, tier, rank, title } = props

    return (
        <div className={`ranking-${tier}`}>
            <span className="rankingTitle">{title}</span>
            <hr />
            <span className="rankingValue"><BsRocketTakeoffFill /> {rankingValueToHumanReadable(value)}</span>
            <span className="rankingRank">{rankingRankToHumanReadable(rank)}</span>
        </div>
    )
}

export default Ranking