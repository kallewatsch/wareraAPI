import React from "react"
import { useDispatch } from 'react-redux'
import { useLazyGetRankingQuery } from "../api"
import { setData } from "../appSlice"

export const Rankings = () => {

    const [getRanking] = useLazyGetRankingQuery()

    const dispatch = useDispatch()

    const handleGetRanking = event => {
        dispatch(setData("soon"))
        /* getBattles().then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    return <>
        <button onClick={handleGetRanking}>getRanking</button>
    </>
}

export default Rankings