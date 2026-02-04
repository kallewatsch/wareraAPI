import React from "react"
import { useDispatch } from 'react-redux'
import { useLazyGetMuByIdQuery, useLazyGetMusPaginatedQuery } from "../api"
import { setData } from "../appSlice"

export const MUs = () => {

    const [getMU] = useLazyGetMuByIdQuery()
    const [getMUsPaginated] = useLazyGetMusPaginatedQuery()

    const dispatch = useDispatch()


    const handleGetMU = event => {
        dispatch(setData("soon"))
        /* getRegionById(data).then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    const handleGetMUsPaginated = event => {
        dispatch(setData("soon"))
        /* getBattles().then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    return <>
        <button onClick={handleGetMU}>getMU</button>
        <button onClick={handleGetMUsPaginated}>getMUsPaginated</button>
    </>
}

export default MUs