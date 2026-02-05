import React from "react"
import { useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
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
        <Button onClick={handleGetBattle}>getBattleRanking</Button>
    </>
}

export default BattleRankings