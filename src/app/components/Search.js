import React from "react"
import { useDispatch } from 'react-redux'
import { useLazySearchAnythingQuery } from "../api"
import { setData } from "../appSlice"

export const Search = () => {

    const [search] = useLazySearchAnythingQuery()

    const dispatch = useDispatch()

    const handleSearch = event => {
        dispatch(setData("soon"))
        /* getBattles().then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    return <>
        <button onClick={handleSearch}>search</button>
    </>
}

export default Search