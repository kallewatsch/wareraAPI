import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useLazyGetCountryByIdQuery, useLazyGetAllCountriesQuery } from "../api"
import { setData } from "../appSlice"

export const Countries = () => {

    const [getCountries] = useLazyGetAllCountriesQuery()
    const [getCountryById] = useLazyGetCountryByIdQuery()
    const [countryId, setCountryId] = useState('')

    const dispatch = useDispatch()

    const handleChange = event => {
        setCountryId(event.target.value)
    }

    const handleGetCountryById = event => {
        getCountryById({countryId}).then(result => {
            let data = result.error ? result.error : result.data.result.data
            dispatch(setData(data))
        })
    }

    const handleGetCountries = event => {
        getCountries().then(result => {
            let data = result.error ? result.error : result.data.result.data
            dispatch(setData(data))
        })
    }

    return <>
        <InputGroup>
            <Button onClick={handleGetCountryById} disabled={!countryId}>getCountryById</Button>
            <Form.Control onChange={handleChange} placeholder="Enter Country ID" />
        </InputGroup>
        <Button onClick={handleGetCountries}>getCountries</Button>
    </>
}

export default Countries