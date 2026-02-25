import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useLazyGetTransactionsQuery } from "../../api"
import { setIsLoading } from "../../appSlice"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import SimpleStats from "../SimpleStats"


const ignoreTypes = ["dismantleItem", "openCase", "wage", "craftItem", "trading", "donation", "applicationFee"]

export const UserInventory = (props) => {

    const { userId } = props
    const [apiKey, setApiKey] = useState('')
    const [transactions, setTransactions] = useState([])
    const [getTransactions] = useLazyGetTransactionsQuery()

    const dispatch = useDispatch()

    const handleChange = event => {
        setApiKey(event.target.value)
    }

    const handleGetInventory = async event => {
        const headers = { "X-API-KEY": apiKey }
        const transactionType = "trading"
        try {
            dispatch(setIsLoading(true))
            let { result: { data: { items, nextCursor } } } = await getTransactions({ data: { userId, transactionType, limit: 100 }, headers }).unwrap()
            let allTransactions = [...items]
            while (nextCursor) {
                const bla = await getTransactions({ data: { userId, transactionType, cursor: nextCursor, limit: 100 }, headers }).unwrap()
                allTransactions = [...allTransactions, ...bla.result.data.items]
                nextCursor = bla.result.data.nextCursor
            }
            setTransactions(allTransactions)
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setIsLoading(false))
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

    return (
        <>
            <Form.Control onChange={handleChange} value={apiKey} placeholder="Enter Api Key" />
            <Button onClick={handleGetInventory} disabled={!apiKey}>get Average Inventory Prices</Button>
            {Object.keys(buysObj).map((key, i) => {
                const avgPrice = parseFloat(buysObj[key]['moneyTotal'] / buysObj[key]['quantityTotal']).toFixed(4)
                const sProps = { [key]: avgPrice }
                return <SimpleStats key={i} {...sProps} />
            })}
            {/* {transactions && transactions.map((ta, i) => <SimpleStats key={i} {...ta} />)} */}
        </>
    )

}


export default UserInventory