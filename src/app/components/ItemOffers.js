import React from "react"
import { useDispatch } from 'react-redux'
import { useLazyGetItemOfferQuery } from "../api"
import { setData } from "../appSlice"

export const ItemOffers = () => {

    const [getItemOffer] = useLazyGetItemOfferQuery()

    const dispatch = useDispatch()

    const handleGetItemOffer = event => {
        dispatch(setData("soon"))
        /* getBattles().then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    return <>
        <button onClick={handleGetItemOffer}>getItemOffer</button>
    </>
}

export default ItemOffers