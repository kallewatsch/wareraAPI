import React from "react"
import { useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
import { useLazyGetRoundByIdQuery, useLazyGetRoundLastHitsQuery } from "../api"
import { setData } from "../appSlice"

export const Rounds = () => {

    const [getRound] = useLazyGetRoundByIdQuery()
    const [getLastHits] = useLazyGetRoundLastHitsQuery()

    const dispatch = useDispatch()

    const handleGetRegions = event => {
        dispatch(setData("soon"))
        /* getRegions().then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    const handleGetRegionById = event => {
        //alert("soon")
        /* getRegionById(data).then(result => {
            dispatch(setData(result.data.result.data))
        }) */
       dispatch(setData("soon"))
    }

    return <>
        <Button onClick={handleGetRegionById}>getRound</Button>
        <Button onClick={handleGetRegions}>getRounds</Button>
    </>
}

export default Rounds