import React, { useState, useEffect } from "react"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import Badge from "react-bootstrap/Badge"
import { GiCoins } from "react-icons/gi"
import { endpoints } from "../../api"


export const MuTransactions = (props) => {

    const { muId } = props || {}

    const [donations, setDonations] = useState([])

    const [getTransactions] = endpoints.getTransactions.useLazyQuery()

    useEffect(() => {
        if (!muId) return;
        const asyncFunc = async () => {
            const transactionType = "donation"
            const limit = 100
            try {
                let { result: { data: { items: donations, nextCursor } } } = await getTransactions({ muId, limit, transactionType }).unwrap()
                let allDonations = [...donations]
                while (nextCursor) {
                    let { result: { data: { items: donations, nextCursor } } } = await getTransactions({ muId, limit, transactionType, nextCursor }).unwrap()
                    allDonations = [...allDonations, ...donations]
                }
                setDonations(allDonations)
            } catch (err) {
                console.log(err)
            }
        }
        asyncFunc()
    }, [muId])

    console.log(muId, donations)

    return (
        <h1>yoooooo</h1>
    )

}


export default MuTransactions