import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
import { useLazySearchAnythingQuery } from "../api"
import { setData } from "../appSlice"

export const Search = () => {

    const [search] = useLazySearchAnythingQuery()
    const [searchText, setSearchText] = useState('')

    const dispatch = useDispatch()

    const handleChange = event => {
        setSearchText(event.target.value)
    }

    const handleSearch = event => {
        search({ searchText }).then(result => {
            let data = result.error ? result.error : result.data.result.data
            dispatch(setData(data))
        })
    }

    return <>
        <input type="text" onChange={handleChange} />
        <Button onClick={handleSearch}>search</Button>
    </>
}

export default Search