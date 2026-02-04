import React from "react"
import { useDispatch } from 'react-redux'
import { useLazyGetCompanyByIdQuery, useLazyGetCompaniesQuery } from "../api"
import { setData } from "../appSlice"

export const Companies = () => {

    const [getCompanies] = useLazyGetCompaniesQuery()
    const [getCompanyById] = useLazyGetCompanyByIdQuery()

    const dispatch = useDispatch()

    const handleGetCompanyById = event => {
        let data = {
            companyId: '69770e1b90a92e6bafce6301'
        }
        getCompanyById(data).then(result => {
            dispatch(setData(result.data.result.data))
        })
    }

    const handleGetCompanies = event => {
        let data = {
            perPage: 10
        }
        getCompanies(data).then(result => {
            console.log({result})
            dispatch(setData(result.data.result.data))
        })
    }

    return <>
        <button onClick={handleGetCompanyById}>getCompanyById</button>
        <button onClick={handleGetCompanies}>getCompanies</button>
    </>
}

export default Companies