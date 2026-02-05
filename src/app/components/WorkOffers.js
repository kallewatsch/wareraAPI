import React from "react"
import { useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
import { useLazyGetWorkOfferQuery, useLazyGetWorkOfferByCompanyQuery, useLazyGetWorkOffersPaginatedQuery } from "../api"
import { setData } from "../appSlice"

export const WorkOffers = () => {

    const [getWorkOffer] = useLazyGetWorkOfferQuery()
    const [getWorkOfferByCompany] = useLazyGetWorkOfferByCompanyQuery()
    const [getWorkOffersPaginated] = useLazyGetWorkOffersPaginatedQuery()

    const dispatch = useDispatch()

    const handleGetWorkOffer = event => {
        dispatch(setData("soon"))
        /* getRegions().then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    const handleGetWorkOffersByCompany = event => {
        dispatch(setData("soon"))
        /* getRegionById(data).then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    let data = {perPage: 10}
    const handleGetWorkOffersPaginated = event => {
        getWorkOffersPaginated(data).then(result => {
            dispatch(setData(result.data.result.data))
        })
    }

    return <>
        <Button onClick={handleGetWorkOffer}>getWorkOffer</Button>
        <Button onClick={handleGetWorkOffersByCompany}>getWorkOfferByCompany</Button>
        <Button onClick={handleGetWorkOffersPaginated}>getWorkOffersPaginated</Button>
    </>
}

export default WorkOffers