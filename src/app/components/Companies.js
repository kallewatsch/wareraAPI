import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useLazyGetCompanyByIdQuery, useLazyGetCompaniesQuery, useLazySearchAnythingQuery } from "../api"
import { setCompanies, setData } from "../appSlice"
import Company from "./Company"

export const Companies = () => {

    const [getCompanies, { isLoading, data, error }] = useLazyGetCompaniesQuery()
    const [getCompanyById, { isLoading: isLoadingId, data: dataId, error: errorId }] = useLazyGetCompanyByIdQuery()
    const [searchAnything] = useLazySearchAnythingQuery()
    const { companies } = useSelector(state => state.app)
    const [companyId, setCompanyId] = useState('')
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState('')

    /* possible filter criteria for getCompanies
        {
    "userId": "string",
    "orgId": "string",
    "perPage": 10,
    "cursor": "string"
    }
    */

    const dispatch = useDispatch()

    const handleChangeUsername = event => {
        setUserName(event.target.value)
    }

    const handleClick = async event => {
        // TODO: search for username, retrieve id and get the user's companies

        try {
            const { result: { data: { userIds } } } = await searchAnything({ searchText: userName }).unwrap()
            const userId = userIds[0]
            //setUserId(userIds[0])
            const { result: { data: { items: companyIds } } } = await getCompanies({ userId }).unwrap()
            const companies = []
            for await (const id of companyIds) {
                console.log(id)
                const { result: { data } } = await getCompanyById({ companyId: id }).unwrap()
                console.log("the data", data)
                companies.push(data)
            }
            dispatch(setCompanies(companies))
            /*  const { result: { data: regions } } = await getRegions().unwrap()
             dispatch(setRegions(regions)) */
        } catch (err) {
            console.log(err)
        } finally {
            console.log("done")
        }
    }

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
        <Row>
            <Col>
                <Form.Control onChange={handleChangeUsername} placeholder="Enter Username" />
                <Button onClick={handleClick}>OK</Button>
            </Col>
            <Col>Enter the exact username. too lazy to show multiple results so i just take the first one for now.</Col>
        </Row>
        {companies && companies.map((company, i) => <Company {...company} />)}
        
    </>
}

export default Companies