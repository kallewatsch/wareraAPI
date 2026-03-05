import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import { BsBoxArrowInRight } from "react-icons/bs";
import CountrySelectModal from "./util/CountrySelectModal"
import { useLazyGetMusPaginatedQuery, useLazyGetUserQuery, useLazyGetUsersByCountryQuery } from "../api"
import { setIsLoading, setUsers, addUsers } from "../appSlice"
import { getMUsByCountry, hasFreeSlots } from "../utils/arrayStuff"
import Mu from "./mu/Mu"


export const FreeMUs = () => {

    const [getUsers] = useLazyGetUsersByCountryQuery()
    const { countries, mus, users } = useSelector(state => state.app)
    const [country, setCountry] = useState()
    const [activeKey, setActiveKey] = useState()
    const [showModal, setShowModal] = useState(true)

    const dispatch = useDispatch()

    const handleSetCountry = async countryId => {
        setShowModal(false)
        setCountry(countries.find(cunt => cunt._id == countryId))
        dispatch(setUsers([]))
        dispatch(setIsLoading(true))
        try {
            let { result: { data: { items: users, nextCursor: nextCursorU }, errorU } } = await getUsers({ countryId, limit: 100 }).unwrap()
            let allItemsU = [...users]
            while (nextCursorU) {
                let { result: { data: moreData }, errorU } = await getUsers({ countryId, cursor: nextCursorU, limit: 100 }).unwrap()
                allItemsU = [...allItemsU, ...moreData.items]
                nextCursorU = moreData.nextCursor
            }
            dispatch(setUsers(allItemsU))
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

    const cuntMus = getMUsByCountry(mus, users)
    const countryMus = cuntMus.sort((a, b) => hasFreeSlots(a) > hasFreeSlots(b) ? -1 : hasFreeSlots(a) < hasFreeSlots(b) ? 1 : 0)

    return (
        <>
            <Button onClick={() => setShowModal(true)}>change Country</Button>
            {cuntMus && country && <h3>There are {cuntMus.length} MUs for country {country.name}</h3>}

            <Accordion activeKey={activeKey} onSelect={handleSetActiveKeyAndScroll}>
                {countryMus && countryMus.map((mu, i) => {
                    const eventKey = mu._id
                    const filledSlots = mu.members.length
                    const maxSlots = (mu.activeUpgradeLevels.dormitories * 5)
                    const empySlots = maxSlots - filledSlots
                    return (
                        <Accordion.Item eventKey={eventKey} id={eventKey} key={i}>
                            <Accordion.Header>{mu.name} {filledSlots}/{maxSlots} {empySlots > 1 && <span className="freeSlotsMadness">!!!FREE SLOTS!!!</span>}</Accordion.Header>
                            <Accordion.Body>
                                <Button target="_blank" href={`https://app.warera.io/mu/${mu._id}`}>Visit Military Unit<BsBoxArrowInRight /></Button>
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