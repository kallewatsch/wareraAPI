import React from "react"
import { useDispatch } from 'react-redux'
import { useLazyGetCountryByIdQuery, useLazyGetAllCountriesQuery } from "../api"
import { setData } from "../appSlice"

export const Countries = () => {

    const [getCountries] = useLazyGetAllCountriesQuery()
    const [getCountryById] = useLazyGetCountryByIdQuery()

    const dispatch = useDispatch()

    const handleGetCountryById = event => {
        let data = {
            countryId: '6813b6d446e731854c7ac79c'
        }
        getCountryById(data).then(result => {
            console.log({result})
            dispatch(setData(result.data.result.data))
        })
    }

    const handleGetCountries = event => {
        getCountries().then(result => {
            dispatch(setData(result.data.result.data))
        })
    }

    return <>
        <button onClick={handleGetCountryById}>getCountryById</button>
        <button onClick={handleGetCountries}>getCountries</button>
    </>
}

export default Countries