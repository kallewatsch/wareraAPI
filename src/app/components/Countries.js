import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import { useLazyGetCountryByIdQuery, useGetAllCountriesQuery } from "../api"
import { setData } from "../appSlice"

export const Countries = () => {

    const [getCountryById] = useLazyGetCountryByIdQuery()
    const { countries } = useSelector(state => state.app)
    const dispatch = useDispatch()

    const handleChange = event => {
        getCountryById({ countryId: event.target.value }).then(result => {
            let data = result.error ? result.error : result.data.result.data
            dispatch(setData(data))
        })
    }

    return <>

        <InputGroup>
            <Form.Select onChange={handleChange}>
                <option value="">Select Country</option>
                {countries && countries.result.data.map((item, i) => <option value={item._id} key={`countryCode-${i}`}>{item.name}</option>)}
            </Form.Select>
        </InputGroup>
    </>
}

export default Countries