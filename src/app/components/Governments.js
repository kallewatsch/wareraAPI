import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useLazyGetGovernmentByIdQuery } from "../api"
import { setData } from "../appSlice"

export const Governments = () => {

    const [getGovernment] = useLazyGetGovernmentByIdQuery()
    const [countryId, setCountryId] = useState('')

    const dispatch = useDispatch()

    const handleChange = event => {
        setCountryId(event.target.value)
    }

    const handleGetGovernment = event => {
        getGovernment({ countryId }).then(result => {
            let data = result.error ? result.error : result.data.result.data
            dispatch(setData(data))
        })
    }

    return <>
        <InputGroup>
            <Button onClick={handleGetGovernment} disabled={!countryId}>getGovernment</Button>
            <Form.Control onChange={handleChange} placeholder="Enter Country ID" />
        </InputGroup>

    </>
}

export default Governments