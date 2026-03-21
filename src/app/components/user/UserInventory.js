import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useLazyGetTransactionsQuery, useLazyGetAnythingBatchedPostQuery } from "../../api"
import {  setToast } from "../../slices/toastSlice"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import SimpleStats from "../SimpleStats"
import SortableTable from "../util/table/SortableTable"
import { getDaysUntil, getPrice, getTransactionUser } from "../../utils/fooStuff"


const ignoreTypes = ["dismantleItem", "openCase", "wage", "craftItem", "trading", "donation", "applicationFee"]

export const UserInventory = (props) => {

    const { userId } = props
    const [apiKey, setApiKey] = useState('')
    const [transactions, setTransactions] = useState([])
    const [users, setUsers] = useState([])
    const [getTransactions] = useLazyGetTransactionsQuery()
    const [getAnythingBatched] = useLazyGetAnythingBatchedPostQuery()

    const dispatch = useDispatch()

    const handleChange = event => {
        setApiKey(event.target.value)
    }

    const handleGetInventory = async event => {
        const headers = { "X-API-KEY": apiKey }
        const transactionType = "trading"
        //dispatch(getTran)
        try {

            let { result: { data: { items, nextCursor } } } = await getTransactions({ data: { userId, transactionType, limit: 100 }, headers }).unwrap()
            let allTransactions = [...items]
            while (nextCursor) {
                let { result: { data: moreData } } = await getTransactions({ data: { userId, transactionType, cursor: nextCursor, limit: 100 }, headers }).unwrap()
                allTransactions = [...allTransactions, ...moreData.items]
                nextCursor = moreData.nextCursor
            }
            setTransactions(allTransactions)
            /* let allItems = []
            allTransactions.forEach(t => {
                const { sellerId, buyerId } = t
                if (!allItems.includes(sellerId)) {
                    allItems.push(sellerId)
                }
                if (!allItems.includes(buyerId)) {
                    allItems.push(buyerId)
                }
            }) */

            /* let allUsers = []
            const ep = 'user.getUserLite'
            while (allItems.length) {
                const chunk = allItems.splice(0, 800)
                const payloadPost = {
                    endpoints: chunk.map(item => ep),
                    obj: Object.fromEntries(chunk.map((userId, i) => [i, { userId }]))
                }
                const someUsers = await getAnythingBatched(payloadPost).unwrap()
                allUsers = [...allUsers, ...someUsers]
            }
            setUsers(allUsers) */
        } catch (err) {
            dispatch(setToast({show: true, content: JSON.stringify(err, null, 2), bg: "danger"}))
        }
    }

    const buys = transactions.filter(ta => ta.buyerId == userId)
    //const sells = transactions.filter(ta => ta.sellerId == userId)

    const buysObj = Object.fromEntries(buys.map(buy => ([buy.itemCode, { moneyTotal: 0, quantityTotal: 0 }])))
    //const sellsObj = Object.fromEntries(sells.map(sell => ([sell.itemCode, 0])))

    buys.forEach(buy => {
        buysObj[buy.itemCode]['moneyTotal'] += buy.money
        buysObj[buy.itemCode]['quantityTotal'] += buy.quantity
    })

    /* sells.forEach(sell => {
        sellsObj[sell.itemCode]['total'] += sell.money
        sellsObj[sell.itemCode]['quantity'] += sell.quantity
    }) */

    /* console.log({ transactions })
    transactions.sort() */

    /* 
         "_id": "69a6aaa83c1729e5e894ffa9",
                    "money": 1.821,
                    "itemCode": "bread",
                    "quantity": 1,
                    "sellerId": "697a4eb7abf9ec82484f0e74",
                    "buyerId": "699db95c431033ab91554751",
                    "transactionType": "trading",
                    "offerCreatedAt": "2026-03-03T09:26:56.970Z",
                    "createdAt": "2026-03-03T09:32:24.589Z",
                    "updatedAt": "2026-03-03T09:32:24.589Z",
                    "__v": 0
    */

    const ths = [
        { txt: 'vor n Tagen', attrPath: ['extended'], target: 'foo' },
        { txt: 'itemCode', attrPath: [], target: 'itemCode' },
        { txt: 'money', attrPath: [], target: 'money' },
        { txt: 'seller', attrPath: ['extended'], target: 'sellerName' },
        { txt: 'buyer', attrPath: ['extended'], target: 'buyerName' },
        /* { txt: 'sellerId', attrPath: [], target: 'sellerId' },
        { txt: 'buyerId', attrPath: [], target: 'buyerId' }, */
        { txt: 'quantity', attrPath: [], target: 'quantity' },
        { txt: 'price', attrPath: ['extended'], target: 'price' }
        /* { txt: 'offerCreatedAt', attrPath: [], target: 'offerCreatedAt' },
        { txt: 'createdAt', attrPath: [], target: 'createdAt' },
        { txt: 'updatedAt', attrPath: [], target: 'updatedAt' }, */
    ]

    const extendedTransactions = [...transactions].map((transaction =>
        Object.assign(
            {},
            { ...transaction },
            {
                extended: {
                    foo: getDaysUntil(transaction.createdAt),
                    price: getPrice(transaction.money, transaction.quantity),
                    sellerName: getTransactionUser([...users], transaction.sellerId),
                    buyerName: getTransactionUser([...users], transaction.buyerId)
                    /* expDmg: getExpectedDamage({ ...user?.skills }),
                    expAttCost: getExpectedAttackCost({ ...user?.skills }, false),
                    canAttackTimes: getCanAttackTimes({ ...user?.skills }),
                    availableDmg: getExpectedDamage({ ...user?.skills }) * getCanAttackTimes({ ...user?.skills }),
                    hoursUntilLastOnline: getHoursUntilLastOnline(user?.dates?.lastConnectionAt) */
                }
            }
        )
    ))

    return (
        <>
            <Form.Control onChange={handleChange} value={apiKey} placeholder="Enter Api Key" />
            <Button onClick={handleGetInventory} disabled={!apiKey}>get Average Inventory Prices</Button>
            {transactions.length && <SortableTable items={[...extendedTransactions]} ths={ths} key={`${users.length}`} />}
            {/* <SimpleStats {...transactions} />
            {Object.keys(buysObj).map((key, i) => {
                const avgPrice = parseFloat(buysObj[key]['moneyTotal'] / buysObj[key]['quantityTotal']).toFixed(4)
                const sProps = { [key]: avgPrice }
                return <p key={i}>{key}:  {avgPrice}</p>
            })} */}
            {/* {transactions && transactions.map((ta, i) => <SimpleStats key={i} {...ta} />)} */}
        </>
    )

}


export default UserInventory