import React from "react"
import { useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
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
        <Button onClick={handleGetRanking}>getRanking</Button>
    </>
}

export default Rankings