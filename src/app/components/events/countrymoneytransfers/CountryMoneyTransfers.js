import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { getValueFromArrayItem } from "../../../utils/arrayStuff"
import MoneyTransfer from "./MoneyTransfer"

export const CountryMoneyTransfers = (props) => {

    const { events, countryId, countries } = props

    console.log("CountryMoneyTransfers", props)

    const sendMoneyEvents = events.filter(x => x.countries[0] == countryId)
    const receiveMoneyEvents = events.filter(x => x.countries[1] == countryId)

    const _receivers = sendMoneyEvents.map(x => ({ id: x.data.countries[1], money: x.data.money }))
    const _senders = receiveMoneyEvents.map(x => ({ id: x.data.countries[0], money: x.data.money }))

    const receiversGrouped = Object.groupBy(_receivers, ({ id }) => id)
    const sendersGrouped = Object.groupBy(_senders, ({ id }) => id)

    /* setReceivers(receiversGrouped)
    setSenders(sendersGrouped) */

    const receiversFucked = Object.keys(receiversGrouped).map((key, i) => {
        const totalMoney = receiversGrouped[key].reduce((accumulator, currentValue) => accumulator + currentValue.money, 0)
        return ({ id: getValueFromArrayItem(countries, '_id', key, 'name'), totalMoney })
    }).sort((a, b) => a.totalMoney > b.totalMoney ? -1 : a.totalMoney < b.totalMoney ? 1 : 0)

    const sendersFucked = Object.keys(sendersGrouped).map((key, i) => {
        const totalMoney = sendersGrouped[key].reduce((accumulator, currentValue) => accumulator + currentValue.money, 0)
        return ({ id: getValueFromArrayItem(countries, '_id', key, 'name'), totalMoney })
    }).sort((a, b) => a.totalMoney > b.totalMoney ? -1 : a.totalMoney < b.totalMoney ? 1 : 0)

    return (
        <>
            <ol>
                {events.map((x, i) => {
                    const { countries: [senderId, receiverId], data: { money }, createdAt } = x
                    const date = new Date(createdAt).toLocaleDateString()
                    const moneyTransferProps = {
                        sender: countries.find(x => x._id == senderId),
                        receiver: countries.find(x => x._id == receiverId),
                        money,
                        date
                    }
                    return <MoneyTransfer {...moneyTransferProps} />
                })}
            </ol>
            {/* <Row>
                <Col>
                    <h6>Receivers</h6>
                    {receiversFucked.map((x, i) => <div key={i}>{x.id}: {x.totalMoney}</div>)}
                </Col>
                <Col>
                    <h6>Senders</h6>
                    {sendersFucked.map((x, i) => <div key={i}>{x.id}: {x.totalMoney}</div>)}
                </Col>
            </Row> */}
        </>

    )

}


export default CountryMoneyTransfers