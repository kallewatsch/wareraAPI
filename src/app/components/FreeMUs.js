import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import CountrySelectModal from "./util/CountrySelectModal"
import { useLazyGetMusPaginatedQuery, useLazyGetUserQuery, useLazyGetUsersByCountryQuery } from "../api"
import { addMus, setMus, setFreeMUs, setIsLoading, setUsers, addUsers } from "../appSlice"


export const FreeMUs = () => {

    const [getMUsPaginated] = useLazyGetMusPaginatedQuery()
    const [getUsers] = useLazyGetUsersByCountryQuery()
    const { data: dataState, countries, isLoading, mus, freeMUs, users } = useSelector(state => state.app)
    const [countryId, setCountryId] = useState('')
    const [country, setCountry] = useState()
    const [showModal, setShowModal] = useState(true)

    const dispatch = useDispatch()


    /* useEffect(() => {
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
    }, [countryId]) */

    const handleSetCountry = async country => {
        setShowModal(false)
        setCountry(countries.find(cunt => cunt._id == country))
        dispatch(setUsers([]))
        dispatch(setIsLoading(true))
        try {

            let { result: { data: { items: users, nextCursor: nextCursorU }, errorU } } = await getUsers({ countryId: country, limit: 100 }).unwrap()
            let allItemsU = [...users]
            while (nextCursorU) {
                let { result: { data: moreData }, errorU } = await getUsers({ countryId: country, cursor: nextCursorU, limit: 100 }).unwrap()
                allItems = [...allItemsU, ...moreData.items]
                nextCursorU = moreData.nextCursor
            }
            let { result: { data: { items, nextCursor }, error } } = await getMUsPaginated({ limit: 100 }).unwrap()
            let allItems = [...items]
            while (nextCursor) {
                let { result: { data: moreData }, error } = await getMUsPaginated({ cursor: nextCursor, limit: 100 }).unwrap()
                allItems = [...allItems, ...moreData.items]
                nextCursor = moreData.nextCursor
            }
            dispatch(setMus(allItems))
            const freeMUs = allItems.filter(item => {
                let cond1 = item.members.length < item.activeUpgradeLevels.dormitories * 5
                let cond2 = users.some((user) => item.user == user._id)
                return cond1 && cond2
            }).map(item => {
                let slots = `${item.members.length}/${item.activeUpgradeLevels.dormitories * 5}`
                return { url: `https://app.warera.io/mu/${item._id}`, name: item.name, slots }
            })
            console.log("zadszu", freeMUs)
            dispatch(setFreeMUs(freeMUs))
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    const handleGetFreeMus = event => {
        let freeMUs = mus.filter(item => {
            let cond1 = item.members.length < item.activeUpgradeLevels.dormitories * 5
            let cond2 = users.some((user) => item.user == user._id)
            return cond1 && cond2
        }).map(item => {
            let slots = `${item.members.length}/${item.activeUpgradeLevels.dormitories * 5}`
            return { url: `https://app.warera.io/mu/${item._id}`, name: item.name, slots }
        })
        dispatch(setFreeMUs(freeMUs))
    }

    const modalProps = {
        show: showModal, handleClose: setShowModal, confirm: handleSetCountry, countries: [...countries],
        title: 'bla'
    }

    return (
        <>
            <Button onClick={() => setShowModal(true)}>change Country</Button>
            {freeMUs && country && <h3>There are {freeMUs.length} MUs with free slots for country {country.name}</h3>}
            <ul>
                {freeMUs.map((mu, i) => (<li key={i}><a href={mu.url} target="_blank">{mu.name} | {mu.slots}</a></li>))}
            </ul>
            <CountrySelectModal {...modalProps} />
        </>
    )
}

export default FreeMUs