import React from "react"
import { useDispatch } from 'react-redux'
import { useLazyGetGovernmentByIdQuery } from "../api"
import { setData } from "../appSlice"

export const Governments = () => {

    const [getGovernment] = useLazyGetGovernmentByIdQuery()

    const dispatch = useDispatch()
    let data = {
            countryId: '6813b6d446e731854c7ac79c'
        }

    const handleGetGovernment = event => {
        getGovernment(data).then(result => {
            dispatch(setData(result.data.result.data))
        })
    }

    return <>
        <button onClick={handleGetGovernment}>getGovernment</button>
    </>
}

export default Governments