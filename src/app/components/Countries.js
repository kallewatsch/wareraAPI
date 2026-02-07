import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import { useLazyGetCountryByIdQuery, useGetAllCountriesQuery } from "../api"
import { setData } from "../appSlice"
import SimpleStats from "./SimpleStats"

export const Countries = () => {

    const [getCountryById] = useLazyGetCountryByIdQuery()
    const { countries } = useSelector(state => state.app)
    const [countryId, setCountryId] = useState('')
    const dispatch = useDispatch()

    const handleChange = event => {
        setCountryId(event.target.value)
    }

    const country = countries && countries.find(country => country._id == countryId)

    return <>
        <InputGroup>
            <Form.Select onChange={handleChange} value={countryId}>
                <option value="">Select Country</option>
                {countries && countries.map((item, i) => <option value={item._id} key={`countryCode-${i}`}>{item.name}</option>)}
            </Form.Select>
        </InputGroup>
        {country && <><img
            alt={country.name}
            src={`https://app.warera.io/images/flags/${country.code}.svg?v=16`} />
            <span>{country.name}</span>
            <SimpleStats {...country} /></>}
    </>
}

export default Countries