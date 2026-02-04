import React from "react"
import { useDispatch } from 'react-redux'
import { useLazyGetTopOrdersQuery} from "../api"
import { setData } from "../appSlice"

export const TradingOrders = () => {

    const [getTopOrders] = useLazyGetTopOrdersQuery()

    const dispatch = useDispatch()

    const handleGetTopOrders = event => {
        dispatch(setData("soon"))
        /* getRegions().then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    return <>
        <button onClick={handleGetTopOrders}>getTopOrders</button>
    </>
}

export default TradingOrders