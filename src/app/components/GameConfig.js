import React from "react"
import { useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
import { useLazyGetGameDatesQuery, useLazyGetGameConfigQuery } from "../api"
import { setData } from "../appSlice"

export const GameConfig = () => {

    const [getDates] = useLazyGetGameDatesQuery()
    const [getConfig] = useLazyGetGameConfigQuery()

    const dispatch = useDispatch()

    const handleGetDates = event => {
        dispatch(setData("soon"))
        /* getRegions().then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    const handleGetConfig = event => {
        dispatch(setData("soon"))
        /* getRegionById(data).then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }


    return <>
        <Button onClick={handleGetDates}>getDates</Button>
        <Button onClick={handleGetConfig}>getConfig</Button>
    </>
}

export default GameConfig