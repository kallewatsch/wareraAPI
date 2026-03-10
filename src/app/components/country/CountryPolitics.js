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
import CountryParty from "./CountryParty"
import { Row } from "react-bootstrap"


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

    const nowVal = (unrest.bar / unrest.barMax) * 100

    const party = partyData?.result?.data
    const government = governmentData?.result?.data
    const unrestDate = unrest?.lastContributionAt && new Date(unrest.lastContributionAt)
    const { __v, _id, country, congressMembers, ...miscMembers } = government || {}
    const a = miscMembers && Object.keys(miscMembers).map(key => ({ role: key, id: miscMembers[key] })) || []
    const b = congressMembers && congressMembers.map(x => ({ id: x, role: "congressMember" })) || []
    const govMembers = [...a, ...b].map(x => ({ user: users.find(user => user._id == x.id), role: x.role }))

    return (
        <Row>
            <div className="countryPolitics">
                {party ? <>
                    <Figure>
                        {party.avatarUrl && <Figure.Image
                            fluid
                            width={64}
                            height={64}
                            alt="Party Avatar"
                            src={party.avatarUrl}
                        />}
                        <Figure.Caption>
                            <h6>{party.name}</h6>
                            <cite>{party?.description}</cite>
                        </Figure.Caption>
                    </Figure>
                    <CountryParty {...party} />
                </>
                    : <div>No ruling Party</div>
                }

                {/* <img className="avatar" src={party?.avatarUrl} alt="Party Avatar" /> */}
                Last Unrest Contribution: {unrestDate?.toLocaleString() || '-'}
                <ProgressBar now={nowVal} label={`${nowVal.toFixed(2)}%`} variant="warning" />
                <Accordion>
                    <AccordionItem eventKey="0">
                        <AccordionHeader>Show Government Members</AccordionHeader>
                        <AccordionBody>
                            <ListGroup>
                                {govMembers.map((x, i) => <ListGroupItem key={i}>{x.user?.username} {x.role}</ListGroupItem>)}
                            </ListGroup>
                        </AccordionBody>
                    </AccordionItem>
                </Accordion>
                {/* {party && <SimpleStats {...party} />} */}
            </div>
        </Row>
    )

}


export default CountryPolitics