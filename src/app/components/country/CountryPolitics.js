import React, { useState, useEffect } from "react"
import { useLazyGetAnythingBatchedPostQuery, useLazyGetGovernmentByIdQuery, useLazyGetPartyByIdQuery } from "../../api"
import ProgressBar from "react-bootstrap/ProgressBar"
import Button from "react-bootstrap/Button"
import "./CountryPolitics.css"
import SimpleStats from "../SimpleStats"
import { Figure } from "react-bootstrap"

export const CountryPolitics = (props) => {

    //console.log("politics", props)

    const { rulingParty: partyId, unrest, countryId } = props

    const [getGovernmentById, { data: governmentData, error: governmentError, isLoading: governmentIsLoading }] = useLazyGetGovernmentByIdQuery()
    const [getPartyById, { data: partyData, error: partyError, isLoading: partyIsLoading }] = useLazyGetPartyByIdQuery()

    useEffect(() => {
        if (!partyId) return;
        getPartyById({ partyId })
    }, [partyId])

    useEffect(() => {
        if (!countryId) return;
        getGovernmentById({ countryId })
    }, [countryId])

    /* useEffect(() => {
        if (!governmentData) return;
        const { result: { data: { __v, _id, congressMembers, ...miscMembers } } } = governmentData
        const userIds = [...Object.keys(miscMembers).map(key => miscMembers[key]), ...congressMembers]
        console.log(userIds)
        
    }, [governmentData]) */

    const nowVal = (unrest.bar / unrest.barMax) * 100

    const party = partyData?.result?.data
    const unrestDate = unrest?.lastContributionAt && new Date(unrest.lastContributionAt)

    return (
        <div className="countryPolitics">
            <Figure>
                <Figure.Image
                    fluid
                    width={64}
                    height={64}
                    alt="Party Avatar"
                    src={party?.avatarUrl}
                />
                <Figure.Caption>
                    <cite>{party?.name}</cite>
                </Figure.Caption>
            </Figure>
            <img className="avatar" src={party?.avatarUrl} alt="Party Avatar" />
            <h6>{party?.name}</h6>
            Last Unrest Contribution: {unrestDate?.toLocaleString() || '-'}
            <ProgressBar now={nowVal} label={`${nowVal.toFixed(2)}%`} variant="warning" />
            {governmentData && <SimpleStats {...governmentData} />}
        </div>
    )

}


export default CountryPolitics