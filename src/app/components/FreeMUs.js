import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import { BsBoxArrowInRight } from "react-icons/bs";
import CountrySelectModal from "./util/CountrySelectModal"
import { useLazyGetMusPaginatedQuery, useLazyGetUserQuery, useLazyGetUsersByCountryQuery } from "../api"
import { addMus, setMus, setFreeMUs, setIsLoading, setUsers, addUsers } from "../appSlice"
import { getFreeMUsByCountry } from "../utils/arrayStuff"
import Mu from "./mu/Mu"


export const FreeMUs = () => {

    const [getMUsPaginated] = useLazyGetMusPaginatedQuery()
    const [getUsers] = useLazyGetUsersByCountryQuery()
    const { countries, mus, /* freeMUs, */ users } = useSelector(state => state.app)
    const [countryId, setCountryId] = useState('')
    const [country, setCountry] = useState()
    const [showModal, setShowModal] = useState(true)

    const dispatch = useDispatch()

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
                allItemsU = [...allItemsU, ...moreData.items]
                nextCursorU = moreData.nextCursor
            }
            let { result: { data: { items, nextCursor }, error } } = await getMUsPaginated({ limit: 100 }).unwrap()
            let allItems = [...items]
            while (nextCursor) {
                let { result: { data: moreData }, error } = await getMUsPaginated({ cursor: nextCursor, limit: 100 }).unwrap()
                allItems = [...allItems, ...moreData.items]
                nextCursor = moreData.nextCursor
            }
            dispatch(setUsers(allItemsU))
            dispatch(setMus(allItems))
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    const modalProps = {
        show: showModal, handleClose: setShowModal, confirm: handleSetCountry, countries: [...countries],
        title: 'bla'
    }

    const freeMUs = getFreeMUsByCountry(mus, users)
    const cuntMUs = mus.filter(mu => users.some(user => user._id == mu.user))
        .filter(mu => freeMUs.every(fmu => fmu._id != mu._id))

    return (
        <>
            <Button onClick={() => setShowModal(true)}>change Country</Button>
            {freeMUs && country && <h3>There are {freeMUs.length} MUs with free slots for country {country.name}</h3>}

            <Accordion>
                {freeMUs.map((mu, i) => {
                    const eventKey = mu._id
                    const slots = `${mu.members.length}/${mu.activeUpgradeLevels.dormitories * 5}`
                    return (
                        <Accordion.Item eventKey={eventKey} id={eventKey} key={i}>
                            <Accordion.Header>{mu.name} {slots} <span className="freeSlotsMadness">!!!FREE SLOTS!!!</span></Accordion.Header>
                            <Accordion.Body>
                                <Button target="_blank" href={`https://app.warera.io/mu/${mu._id}`}>Visit Military Unit<BsBoxArrowInRight /></Button>
                                <Mu {...mu} />
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
                {cuntMUs.map((mu, i) => {
                    const eventKey = mu._id
                    return (
                        <Accordion.Item eventKey={eventKey} id={eventKey} key={`bla-${i}`}>
                            <Accordion.Header>{mu.name}</Accordion.Header>
                            <Accordion.Body>
                                <Mu {...mu} />
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
            <CountrySelectModal {...modalProps} />
        </>
    )
}

export default FreeMUs