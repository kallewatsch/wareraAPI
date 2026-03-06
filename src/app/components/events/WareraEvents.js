import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLazyGetEventsPaginatedQuery } from "../../api"
import { getValueFromArrayItem } from "../../utils/arrayStuff"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import CountrySelectModal from "../util/CountrySelectModal"
import { setIsLoading, setToast } from "../../appSlice"
import CountryMoneyTransfers from "./countrymoneytransfers/CountryMoneyTransfers"

const eventTypes = [
    'countryMoneyTransfer',
    /* 'warDeclared',
    'peace_agreement',
    'battleOpened',
    'battleEnded',
    'newPresident',
    'regionTransfer',
    'peaceMade',
    'depositDiscovered',
    'depositDepleted',
    'systemRevolt',
    'bankruptcy',
    'allianceFormed',
    'allianceBroken',
    'regionLiberated',
    'strategicResourcesReshuffled',
    'resistanceIncreased',
    'resistanceDecreased',
    'revolutionStarted',
    'revolutionEnded',
    'financedRevolt' */
]


export const WareraEvents = () => {

    const { countries } = useSelector(state => state.app)
    const [filterEvents, setFilterEvents] = useState([])
    const [events, setEvents] = useState([])
    const [showModal, setShowModal] = useState(true)
    const [countryId, setCountryId] = useState('')
    const [getEvents] = useLazyGetEventsPaginatedQuery()

    const dispatch = useDispatch()

    const handleSetCountryId = countryId => {
        setCountryId(countryId)
        setShowModal(false)
    }

    const handleChange = event => {
        const { target: { checked, id } } = event
        if (checked) {
            setFilterEvents([...filterEvents, id])
        } else {
            setFilterEvents([...filterEvents].filter(x => x != id))
        }
    }

    const handleGetEvents = async event => {

        let allEvents = []

        try {
            dispatch(setIsLoading(true))
            const payload = { limit: 100, countryId, eventTypes: filterEvents }
            let { result: { data: { items, nextCursor }, error } } = await getEvents(payload).unwrap()
            allEvents = [...items]
            while (nextCursor) {
                const anotherPayload = { limit: 100, countryId, eventTypes: filterEvents, cursor: nextCursor }
                let { result: { data: moreData }, error } = await getEvents(anotherPayload).unwrap()
                allEvents = [...allEvents, ...moreData.items]
                nextCursor = moreData.nextCursor
            }
        } catch (err) {
            dispatch(setToast({ show: true, content: JSON.stringify(err, null, 2), bg: "danger" }))
        } finally {
            dispatch(setIsLoading(false))
        }
        setEvents(allEvents)
    }


    const checkBoxes = eventTypes.map((x, i) => <Form.Check inline key={i} id={x} label={x} onChange={handleChange} />)
    const modalProps = {
        show: showModal, handleClose: setShowModal, confirm: handleSetCountryId, countries: [...countries],
        title: 'bla'
    }

    const countryMoneyTransferEvents = events.filter(x => x.data.type == "countryMoneyTransfer")

    return (
        <>
            <Row>
                <Col>{checkBoxes}</Col>
                <Col>
                    <Button onClick={() => setShowModal(true)}>Change Country</Button>
                    <Button onClick={handleGetEvents}>GO</Button>
                </Col>
            </Row>
            <h6>{countryId && getValueFromArrayItem(countries, '_id', countryId, 'name')}</h6>
            {countryMoneyTransferEvents.length && <CountryMoneyTransfers events={countryMoneyTransferEvents} countryId={countryId} countries={countries} />}
            <CountrySelectModal {...modalProps} />
        </>
    )

}


export default WareraEvents