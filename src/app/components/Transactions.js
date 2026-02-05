import React from "react"
import { useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
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
        <Button onClick={handleGetTransactions}>getTransactions</Button>
    </>
}

export default Transactions