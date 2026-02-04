import React from "react"
import { useDispatch } from 'react-redux'
import { useLazyGetTransactionsQuery } from "../api"
import { setData } from "../appSlice"

export const Transactions = () => {

    const [getTransactions] = useLazyGetTransactionsQuery()

    const dispatch = useDispatch()

    const handleGetTransactions = event => {
        dispatch(setData("soon"))
        /* getRegions().then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    return <>
        <button onClick={handleGetTransactions}>getTransactions</button>
    </>
}

export default Transactions