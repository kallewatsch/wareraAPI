import React from "react"
import { useDispatch } from 'react-redux'
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
        <button onClick={handleGetRegionById}>getRound</button>
        <button onClick={handleGetRegions}>getRounds</button>
    </>
}

export default Rounds