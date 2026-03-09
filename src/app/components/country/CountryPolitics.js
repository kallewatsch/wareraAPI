import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useLazyGetAnythingBatchedPostQuery, useLazyGetGovernmentByIdQuery, useLazyGetPartyByIdQuery } from "../../api"
import ProgressBar from "react-bootstrap/ProgressBar"
import Accordion from "react-bootstrap/Accordion"
import AccordionItem from "react-bootstrap/AccordionItem"
import AccordionHeader from "react-bootstrap/AccordionHeader"
import AccordionBody from "react-bootstrap/AccordionBody"
import Figure from "react-bootstrap/Figure"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import "./CountryPolitics.css"
import SimpleStats from "../SimpleStats"


export const CountryPolitics = (props) => {

    //console.log("politics", props)

    const { rulingParty: partyId, unrest, countryId } = props

    const { users } = useSelector(state => state.app)

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
    const government = governmentData?.result?.data
    const unrestDate = unrest?.lastContributionAt && new Date(unrest.lastContributionAt)
    const { __v, _id, country, congressMembers, ...miscMembers } = government || {}
    const a = miscMembers && Object.keys(miscMembers).map(key => ({ role: key, id: miscMembers[key] })) || []
    const b = congressMembers && congressMembers.map(x => ({ id: x, role: "congressMember" })) || []
    const govMembers = [...a, ...b].map(x => ({ user: users.find(user => user._id == x.id), role: x.role }))

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
            {/* <img className="avatar" src={party?.avatarUrl} alt="Party Avatar" /> */}
            <h6>{party?.name}</h6>
            Last Unrest Contribution: {unrestDate?.toLocaleString() || '-'}
            <ProgressBar now={nowVal} label={`${nowVal.toFixed(2)}%`} variant="warning" />
            <Accordion>
                <AccordionItem eventKey="0">
                    <AccordionHeader>Show Government Members</AccordionHeader>
                    <AccordionBody>
                        <ListGroup>
                            {govMembers.map((x, i) => <ListGroupItem key={i}>{x.user.username} {x.role}</ListGroupItem>)}
                        </ListGroup>
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
            <hr />
            <b>TODO: Ruling Party</b>
            {/* {partyData && <SimpleStats {...partyData} />} */}
        </div>
    )

}


export default CountryPolitics