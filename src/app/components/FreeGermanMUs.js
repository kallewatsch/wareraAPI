import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useLazyGetMusPaginatedQuery, useLazyGetUserQuery, useLazyGetUsersByCountryQuery } from "../api"
import { addMus, setData, setFreeMUs, setIsLoading, setUsers, addUsers } from "../appSlice"


export const FreeGermanMUs = () => {

    const [getMUsPaginated] = useLazyGetMusPaginatedQuery()
    const [getUsersPaginated] = useLazyGetUsersByCountryQuery()
    const { data: dataState, countries, isLoading, mus, freeMUs, users } = useSelector(state => state.app)
    const [countryId, setCountryId] = useState('')
    const dispatch = useDispatch()


    useEffect(() => {
        const getNextCursorMU = async (cursor) => {
            const data = await getMUsPaginated(cursor).unwrap()
            dispatch(addMus(data.result.data.items))
            if (data && data.result.data.nextCursor) {
                getNextCursorMU({ cursor: data.result.data.nextCursor })
            } else {
                dispatch(setIsLoading(false))
            }
        }
        dispatch(setIsLoading(true))
        getNextCursorMU({}).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const getNextCursorUsers = async (params) => {
            const data = await getUsersPaginated(params).unwrap()
            dispatch(addUsers(data.result.data.items))
            if (data && data.result.data.nextCursor) {
                getNextCursorUsers({ cursor: data.result.data.nextCursor, limt: 100, countryId: params.countryId })
            } else {
                dispatch(setIsLoading(false))
            }
        }
        if (!countryId) return;
        dispatch(setIsLoading(true))
        getNextCursorUsers({countryId}).catch(err => console.log(err))
    }, [countryId])

    const handleChangeCountry = event => {
        dispatch(setUsers([]))
        setCountryId(event.target.value)
    }

    const handleGetFreeMus = event => {
        let freeMUs = mus.filter(item => {
            let cond1 = item.members.length < item.activeUpgradeLevels.dormitories * 5
            let cond2 = users.some((user) => item.user == user._id)
            return cond1 && cond2
        }).map(item => {
            let slots = `${item.members.length}/${item.activeUpgradeLevels.dormitories*5}`
            return { url: `https://app.warera.io/mu/${item._id}`, name: item.name, slots }
        })

        

        dispatch(setFreeMUs(freeMUs))
    }

    const countryOptions = countries && countries.result.data.map((country, i) => <option key={`country-${i}`} value={country._id}>{country.name}</option>)

    return <>
        <InputGroup>
            <Button onClick={handleGetFreeMus} variant={isLoading ? 'warning' : 'success'} disabled={isLoading || !countryId}>{isLoading ? 'loading' : 'getFreeMUs'}</Button>
            <Form.Select value={countryId} onChange={handleChangeCountry}>
                <option>Select Country</option>
                {countryOptions}
            </Form.Select>
        </InputGroup>
        <ul>
            {freeMUs.map((mu, i) => (<li key={i}><a href={mu.url} target="_blank">{mu.name} | {mu.slots}</a></li>))}
        </ul>
    </>

}

export default FreeGermanMUs