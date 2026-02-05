import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
import { useLazyGetCompanyByIdQuery, useLazyGetCompaniesQuery } from "../api"
import { setData } from "../appSlice"

export const Companies = () => {

    const [getCompanies, { isLoading, data, error }] = useLazyGetCompaniesQuery()
    const [getCompanyById, { isLoading: isLoadingId, data: dataId, error: errorId }] = useLazyGetCompanyByIdQuery()
    const [companyId, setCompanyId] = useState('')

    /* possible filter criteria for getCompanies
        {
    "userId": "string",
    "orgId": "string",
    "perPage": 10,
    "cursor": "string"
    }
    */

    const dispatch = useDispatch()

    const handleChange = event => {
        setCompanyId(event.target.value)
    }

    const handleGetCompanyById = event => {
        getCompanyById({ companyId }).then(result => {
            let data = result.error ? result.error : result.data.result.data
            dispatch(setData(data))
        })
    }

    const handleGetCompanies = event => {
        let data = {
            perPage: 10
        }
        getCompanies(data).then(result => {
           let data = result.error ? result.error : result.data.result.data
            dispatch(setData(data))
        })
    }

    return <>
        <input onChange={handleChange} value={companyId} placeholder="Enter Company ID" />
        <Button onClick={handleGetCompanyById} disabled={!companyId}>getCompanyById</Button>
        <Button onClick={handleGetCompanies}>getCompanies</Button>
        <b>TODO: interface and usage of filter criteria for getCompanies</b>
    </>
}

export default Companies