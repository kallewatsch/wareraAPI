import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useLazyGetRegionByIdQuery, useLazyGetRegionsQuery } from "../api"
import { setData } from "../appSlice"

export const Regions = () => {

    const [getRegions] = useLazyGetRegionsQuery()
    const [getRegionById] = useLazyGetRegionByIdQuery()
    const [regionId, setRegionId] = useState('')

    const dispatch = useDispatch()

    const handleChange = event => {
        setRegionId(event.target.value)
    }

    const handleGetRegions = event => {
        getRegions().then(result => {
            dispatch(setData(result.data.result.data))
        })
    }

    const handleGetRegionById = event => {
        getRegionById({ regionId }).then(result => {
            let data = result.error ? result.error : result.data.result.data
            dispatch(setData(data))
        })
    }

    return <>
        <InputGroup>
            <Button onClick={handleGetRegionById} disabled={!regionId}>getRegion</Button>
            <Form.Control onChange={handleChange} placeholder="Enter Region ID" />
        </InputGroup>

        <Button onClick={handleGetRegions}>getRegions</Button>
    </>
}

export default Regions