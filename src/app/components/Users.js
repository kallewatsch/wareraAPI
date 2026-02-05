import React from "react"
import { useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
import { useLazyGetUserQuery, useLazyGetUsersByCountryQuery } from "../api"
import { setData } from "../appSlice"

export const Users = () => {

    const [getUser] = useLazyGetUserQuery()
    const [getUsersByCountry] = useLazyGetUsersByCountryQuery()

    const dispatch = useDispatch()

    const handleGetUser = event => {
        dispatch(setData("soon"))
        /* getRegionById(data).then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    const handleGetUsersByCountry = event => {
        dispatch(setData("soon"))
        /* getBattles().then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    return <>
        <Button onClick={handleGetUser}>getUser</Button>
        <Button onClick={handleGetUsersByCountry}>getUserByCountry</Button>
    </>
}

export default Users