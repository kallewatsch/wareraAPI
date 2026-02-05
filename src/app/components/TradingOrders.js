import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useLazyGetTopOrdersQuery } from "../api"
import { setData } from "../appSlice"

const itemCodes = [
    "cookedFish",
    "heavyAmmo",
    "steel",
    "bread",
    "grain",
    "limestone",
    "coca",
    "concrete",
    "oil",
    "case1",
    "lightAmmo",
    "steak",
    "livestock",
    "cocain",
    "lead",
    "fish",
    "petroleum",
    "ammo",
    "iron",
    "scraps",
    "case2"
]

export const TradingOrders = () => {

    const [getTopOrders] = useLazyGetTopOrdersQuery()
    const [itemCode, setItemCode] = useState('')

    const dispatch = useDispatch()

    const handleChange = event => {
        setItemCode(event.target.value)
    }

    const handleGetTopOrders = event => {
        getTopOrders({itemCode}).then(result => {
            let data = result.error ? result.error : result.data.result.data
            dispatch(setData(data))
        })
    }

    return <>
        <Form.Select onChange={handleChange} value={itemCode}>
            <option value="">Select Item</option>
            {itemCodes.map((item, i) => <option value={item} key={`itemCode-${i}`}>{item}</option>)}
        </Form.Select>
        <Button onClick={handleGetTopOrders} disabled={!itemCode}>getTopOrders</Button>
        <b>TODO: add perPage option</b>
    </>
}

export default TradingOrders