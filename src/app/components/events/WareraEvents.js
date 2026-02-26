import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLazyGetEventsPaginatedQuery } from "../../api"
import { getValueFromArrayItem } from "../../utils/arrayStuff"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import CountrySelectModal from "../util/CountrySelectModal"
import { setIsLoading } from "../../appSlice"

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
    const [showModal, setShowModal] = useState(true)
    const [countryId, setCountryId] = useState('')
    const [getEvents] = useLazyGetEventsPaginatedQuery()
    const [senders, setSenders] = useState({})
    const [receivers, setReceivers] = useState({})

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
            console.log(err)
        } finally {
            dispatch(setIsLoading(false))
        }

        const sendMoneyEvents = allEvents.filter(x => x.countries[0] == countryId)
        const receiveMoneyEvents = allEvents.filter(x => x.countries[1] == countryId)

        const _receivers = sendMoneyEvents.map(x => ({ id: x.data.countries[1], money: x.data.money }))
        const _senders = receiveMoneyEvents.map(x => ({ id: x.data.countries[0], money: x.data.money }))

        const receiversGrouped = Object.groupBy(_receivers, ({ id }) => id)
        const sendersGrouped = Object.groupBy(_senders, ({ id }) => id)

        setReceivers(receiversGrouped)
        setSenders(sendersGrouped)
    }


    const checkBoxes = eventTypes.map((x, i) => <Form.Check inline key={i} id={x} label={x} onChange={handleChange} />)
    const modalProps = {
        show: showModal, handleClose: setShowModal, confirm: handleSetCountryId, countries: [...countries],
        title: 'bla'
    }

    const receiversFucked = Object.keys(receivers).map((key, i) => {
        const totalMoney = receivers[key].reduce((accumulator, currentValue) => accumulator + currentValue.money, 0)
        return ({ id: getValueFromArrayItem(countries, '_id', key, 'name'), totalMoney })
    }).sort((a, b) => a.totalMoney > b.totalMoney ? -1 : a.totalMoney < b.totalMoney ? 1 : 0)

    const sendersFucked = Object.keys(senders).map((key, i) => {
        const totalMoney = senders[key].reduce((accumulator, currentValue) => accumulator + currentValue.money, 0)
        return ({ id: getValueFromArrayItem(countries, '_id', key, 'name'), totalMoney })
    }).sort((a, b) => a.totalMoney > b.totalMoney ? -1 : a.totalMoney < b.totalMoney ? 1 : 0)

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
            <Row>
                <Col>
                    <h6>Receivers</h6>
                    {receiversFucked.map((x, i) => <div key={i}>{x.id}: {x.totalMoney}</div>)}
                </Col>
                <Col>
                    <h6>Senders</h6>
                    {sendersFucked.map((x, i) => <div key={i}>{x.id}: {x.totalMoney}</div>)}
                </Col>
            </Row>
            <CountrySelectModal {...modalProps} />
        </>
    )

}


export default WareraEvents