import React from "react"
import { useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
import { useLazyGetEventsPaginatedQuery } from "../api"
import { setData } from "../appSlice"

export const Events = () => {

    const [getEvents] = useLazyGetEventsPaginatedQuery()

    const dispatch = useDispatch()
    /*  possible filter criteria for getEvents
           {
       "limit": 10,
       "cursor": "string",
       "countryId": "string",
       "eventTypes": [
           "warDeclared"
       ]
   }
       */

    const handleGetEvents = event => {
        getEvents({}).then(result => {
            let data = result.error ? result.error : result.data.result.data
            dispatch(setData(data))
        })
    }

    return <>
        <Button onClick={handleGetEvents}>getEventsPaginated</Button>
        <b>TODO: interface and usage of filter criteria for getEvents</b>
    </>
}

export default Events