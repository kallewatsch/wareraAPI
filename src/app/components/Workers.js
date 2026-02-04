import React from "react"
import { useDispatch } from 'react-redux'
import { useLazyGetWorkersQuery, useLazyGetWorkersTotalQuery } from "../api"
import { setData } from "../appSlice"

export const Workers = () => {

    const [getWorkers] = useLazyGetWorkersQuery()
    const [getWorkersTotal] = useLazyGetWorkersTotalQuery()

    const dispatch = useDispatch()

    const handleGetWorkers = event => {
        dispatch(setData("soon"))
        /* getRegionById(data).then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    const handleGetWorkersTotal = event => {
        dispatch(setData("soon"))
        /* getBattles().then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    return <>
        <button onClick={handleGetWorkers}>getWorkers</button>
        <button onClick={handleGetWorkersTotal}>getWorkersTotal</button>
    </>
}

export default Workers