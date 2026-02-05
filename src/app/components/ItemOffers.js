import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useLazyGetItemOfferQuery } from "../api"
import { setData } from "../appSlice"

export const ItemOffers = () => {

    const [getItemOffer] = useLazyGetItemOfferQuery()
    const [itemOfferId, setItemOfferId] = useState('')

    const dispatch = useDispatch()

    const handleChange = event => {
        setItemOfferId(event.target.value)
    }

    const handleGetItemOffer = event => {
        getItemOffer({}).then(result => {
            let data = result.error ? result.error : result.data.result.data
            dispatch(setData(data))
        })
    }

    return <>
        <InputGroup>
            <Button onClick={handleGetItemOffer} disabled={!itemOfferId}>getItemOffer</Button>
            <Form.Control onChange={handleChange} placeholder="Enter ItemOffer ID" />
        </InputGroup>
    </>
}

export default ItemOffers