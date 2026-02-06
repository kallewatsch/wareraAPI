import React, { useEffect } from "react"
import { useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
import { useLazyGetUserQuery, useLazyGetUsersByCountryQuery } from "../api"
import { setData } from "../appSlice"

export const Users = () => {

    const [getUser] = useLazyGetUserQuery()
    const [getUsersByCountry, { data, error, isLoading }] = useLazyGetUsersByCountryQuery()

    const dispatch = useDispatch()

    useEffect(() => {
        let foo = data ? data : error
        dispatch(setData(foo))
    }, [data, error])

    const handleGetUser = event => {
        dispatch(setData("soon"))
        getUser({userId: "6983b8bc09d4e2cdfd1c7cbf"}).then(result => {
            dispatch(setData(result.data.result.data))
        })
    }

    const handleGetUsersByCountry = event => {
        getUsersByCountry({countryId: "6813b6d446e731854c7ac79c"})
    }

    return <>
        <Button onClick={handleGetUser}>getUser</Button>
        <Button onClick={handleGetUsersByCountry}>getUserByCountry</Button>
    </>
}

export default Users