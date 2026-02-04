import React from "react"
import { useDispatch } from 'react-redux'
import { useLazyGetBattleRankingQuery } from "../api"
import { setData } from "../appSlice"

export const BattleRankings = () => {

    const [getBattleRanking] = useLazyGetBattleRankingQuery()

    const dispatch = useDispatch()

    const handleGetBattle = event => {
        dispatch(setData("soon"))
        /* getRegions().then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }


    return <>
        <button onClick={handleGetBattle}>getBattleRanking</button>
    </>
}

export default BattleRankings