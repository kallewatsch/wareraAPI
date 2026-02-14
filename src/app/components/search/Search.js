import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import ListGroup from "react-bootstrap/ListGroup"
import { BsSearch } from "react-icons/bs";
import { useLazySearchAnythingQuery } from "../../api"
import { setIsLoading, setSearchResult } from "../../appSlice"
import SearchResult from "./SearchResult"

export const resultArrayNames = [
    "countryIds",
    "muIds",
    //"partyIds", // no public endpoint available yet
    "regionIds",
    "userIds"
]

export const Search = () => {

    const [searchAnything] = useLazySearchAnythingQuery()
    const { search } = useSelector(state => state.app)
    const [searchText, setSearchText] = useState('')

    const dispatch = useDispatch()

    const handleChange = event => {
        setSearchText(event.target.value)
    }

    const handleSearch = async event => {
        dispatch(setIsLoading(true))
        try {
            const { result: { data, error } } = await searchAnything({ searchText }).unwrap()
            data && dispatch(setSearchResult(data))
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    return <>
        <Row className="justify-content-md-center">
            <Col md={6}>
                <InputGroup>
                    <InputGroup.Text><BsSearch /></InputGroup.Text>
                    <Form.Control onChange={handleChange} />
                    <Button onClick={handleSearch}>search</Button>
                </InputGroup>
            </Col>
        </Row>
        <Row>
            <Col>
                <ListGroup>
                    {search.hasData && resultArrayNames.map((r, i) => {
                        const srProps = { resultIds: search[r], resultType: r }
                        return <ListGroup.Item key={i} variant={search[r].length ? 'success' : 'secondary'}><SearchResult {...srProps} /></ListGroup.Item>
                    })}
                </ListGroup>
            </Col>
        </Row>



    </>
}

export default Search