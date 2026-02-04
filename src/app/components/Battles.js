import React from "react"
import { useDispatch } from 'react-redux'
import { useLazyGetBattleByIdQuery, useLazyGetBattleLiveQuery, useLazyGetBattlesQuery } from "../api"
import { setData } from "../appSlice"

export const Battles = () => {

    const [getBattle] = useLazyGetBattleByIdQuery()
    const [getBattleLive] = useLazyGetBattleLiveQuery()
    const [getBattles] = useLazyGetBattlesQuery()

    const dispatch = useDispatch()

    const handleGetBattle = event => {
        dispatch(setData("soon"))
        /* getRegions().then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    const handleGetBattleLive = event => {
        dispatch(setData("soon"))
        /* getRegionById(data).then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    const handleGetBattles = event => {
        dispatch(setData("soon"))
        /* getBattles().then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    return <>
        <button onClick={handleGetBattle}>getBattle</button>
        <button onClick={handleGetBattleLive}>getBattleLive</button>
        <button onClick={handleGetBattles}>getBattles</button>
    </>
}

export default Battles