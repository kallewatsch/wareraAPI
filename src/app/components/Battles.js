import React from "react"
import { useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
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
        <Button onClick={handleGetBattle}>getBattle</Button>
        <Button onClick={handleGetBattleLive}>getBattleLive</Button>
        <Button onClick={handleGetBattles}>getBattles</Button>
    </>
}

export default Battles