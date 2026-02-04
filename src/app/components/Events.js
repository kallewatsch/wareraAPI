import React from "react"
import { useDispatch } from 'react-redux'
import { useLazyGetEventsPaginatedQuery } from "../api"
import { setData } from "../appSlice"

export const Events = () => {

    const [getEvents] = useLazyGetEventsPaginatedQuery()

    const dispatch = useDispatch()
    let data = {
            perPage: 10
        }

    const handleGetEvents = event => {
        getEvents(data).then(result => {
            dispatch(setData(result.data.result.data))
        })
    }

    return <>
        <button onClick={handleGetEvents}>getEventsPaginated</button>
    </>
}

export default Events