import React, { useState } from "react"
import { useDispatch } from 'react-redux'
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
        search({searchText}).then(result => {
            dispatch(setData(result.data.result.data))
        })
    }

    return <>
        <input type="text" onChange={handleChange} />
        <button onClick={handleSearch}>search</button>
    </>
}

export default Search