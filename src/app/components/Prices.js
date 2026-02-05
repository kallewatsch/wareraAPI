import React from "react"
import { useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
import { useLazyGetPricesQuery } from "../api"
import { setData } from "../appSlice"

export const Prices = () => {

    const [getPrices] = useLazyGetPricesQuery()

    const dispatch = useDispatch()

    const handleGetPrices = event => {
        getPrices().then(result => {
            dispatch(setData(result.data.result.data))
        })
    }

    return <>
        <Button onClick={handleGetPrices}>getPrices</Button>
    </>
}

export default Prices