import React from "react"
import { useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
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
        <Button onClick={handleGetWorkers}>getWorkers</Button>
        <Button onClick={handleGetWorkersTotal}>getWorkersTotal</Button>
    </>
}

export default Workers