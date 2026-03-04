import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import { BsBoxArrowInRight } from "react-icons/bs";
import CountrySelectModal from "./util/CountrySelectModal"
import { useLazyGetMusPaginatedQuery, useLazyGetUserQuery, useLazyGetUsersByCountryQuery } from "../api"
import { addMus, setMus, setFreeMUs, setIsLoading, setUsers, addUsers } from "../appSlice"
import { getFreeMUsByCountry, getMUsByCountry, hasFreeSlots } from "../utils/arrayStuff"
import Mu from "./mu/Mu"


export const FreeMUs = () => {

    const [getMUsPaginated] = useLazyGetMusPaginatedQuery()
    const [getUsers] = useLazyGetUsersByCountryQuery()
    const { countries, mus, /* freeMUs, */ users } = useSelector(state => state.app)
    const [countryId, setCountryId] = useState('')
    const [country, setCountry] = useState()
    const [activeKey, setActiveKey] = useState()
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

    const handleSetActiveKeyAndScroll = key => {
        if (key == activeKey || !key) {
            setActiveKey("")
        } else {
            setActiveKey(key)
            setTimeout(() => {
                const el = document.getElementById(key)
                el.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                })
            }, 500)
        }
    }

    const modalProps = {
        show: showModal, handleClose: setShowModal, confirm: handleSetCountry, countries: [...countries],
        title: 'bla'
    }

    //const freeMUs = getFreeMUsByCountry(mus, users)
    const cuntMus = getMUsByCountry(mus, users)
    //.filter(mu => freeMUs.every(fmu => fmu._id != mu._id))
    const countryMus = cuntMus.sort((a, b) => hasFreeSlots(a) > hasFreeSlots(b) ? -1 : hasFreeSlots(a) < hasFreeSlots(b) ? 1 : 0)

    return (
        <>
            <Button onClick={() => setShowModal(true)}>change Country</Button>
            {cuntMus && country && <h3>There are {cuntMus.length} MUs for country {country.name}</h3>}

            <Accordion activeKey={activeKey} onSelect={handleSetActiveKeyAndScroll}>
                {countryMus && countryMus.map((mu, i) => {
                    const eventKey = mu._id
                    const slots = mu.members.length - 1
                    const maxSlots = (mu.activeUpgradeLevels.dormitories * 5) - 1
                    //const slots = `${mu.members.length - 1}/${(mu.activeUpgradeLevels.dormitories * 5) - 1}`
                    return (
                        <Accordion.Item eventKey={eventKey} id={eventKey} key={i}>
                            <Accordion.Header>{mu.name} {slots}/{maxSlots} {slots < maxSlots && <span className="freeSlotsMadness">!!!FREE SLOTS!!!</span>}</Accordion.Header>
                            <Accordion.Body>
                                <Button target="_blank" href={`https://app.warera.io/mu/${mu._id}`}>Visit Military Unit<BsBoxArrowInRight /></Button>
                                <Mu {...mu} />
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
                {/* {cuntMUs.map((mu, i) => {
                    const eventKey = mu._id
                    const slots = `${mu.members.length - 1}/${(mu.activeUpgradeLevels.dormitories * 5) - 1}`
                    return (
                        <Accordion.Item eventKey={eventKey} id={eventKey} key={`bla-${i}`}>
                            <Accordion.Header>{mu.name} {slots}</Accordion.Header>
                            <Accordion.Body>
                                <Mu {...mu} />
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })} */}
            </Accordion>
            <CountrySelectModal {...modalProps} />
        </>
    )
}

export default FreeMUs