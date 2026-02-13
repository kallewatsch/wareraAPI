import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Button from "react-bootstrap/Button"
import { useLazySearchAnythingQuery } from "../../api"
import { setIsLoading, setSearchResult } from "../../appSlice"
import SearchResult from "./SearchResult"

export const resultArrayNames = [
    /* "countryIds",
    "muIds",
    "partyIds",
    "regionIds", */
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
            const { result: { data, error }} = await searchAnything({searchText}).unwrap()
            data && dispatch(setSearchResult(data))
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    return <>
        <input type="text" onChange={handleChange} />
        <Button onClick={handleSearch}>search</Button>
        {search.hasData && resultArrayNames.map((r,i) => {
            const srProps = {resultIds: search[r], resultType: r}
            return <SearchResult key={i} {...srProps} />
        })}
    </>
}

export default Search