import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLazyGetGovernmentByIdQuery, useLazyGetPartyByIdQuery } from "../../api"
import { addUsers } from "../../slices/usersSlice"
import ProgressBar from "react-bootstrap/ProgressBar"
import Accordion from "react-bootstrap/Accordion"
import AccordionItem from "react-bootstrap/AccordionItem"
import AccordionHeader from "react-bootstrap/AccordionHeader"
import AccordionBody from "react-bootstrap/AccordionBody"
import Figure from "react-bootstrap/Figure"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import Row from "react-bootstrap/Row"
import CountryParty from "./CountryParty"
import "./CountryPolitics.css"


export const CountryPolitics = (props) => {

    //console.log("politics", props)
    const { rulingParty: partyId, unrest, countryId } = props

    const { users } = useSelector(state => state.app)

    const [getGovernmentById, { data: governmentData, error: governmentError, isLoading: governmentIsLoading }] = useLazyGetGovernmentByIdQuery()
    const [getPartyById, { data: partyData, error: partyError, isLoading: partyIsLoading }] = useLazyGetPartyByIdQuery()

    const dispatch = useDispatch()

    const party = partyData?.result?.data
    const government = governmentData?.result?.data
    const unrestDate = unrest?.lastContributionAt && new Date(unrest.lastContributionAt)
    const { __v, _id, country, congressMembers, ...miscMembers } = government || {}
    const a = miscMembers && Object.keys(miscMembers).map(key => ({ role: key, id: miscMembers[key] })) || []
    const b = congressMembers && congressMembers.map(x => ({ id: x, role: "congressMember" })) || []

    const govUserIds = [...a, ...b].map(x => x.id)
    const govMembers = [...a, ...b].map(x => ({ user: users.find(user => user._id == x.id), role: x.role }))

    useEffect(() => {
        if (!partyId) return;
        getPartyById({ partyId })
    }, [partyId])

    useEffect(() => {
        if (!countryId) return;
        getGovernmentById({ countryId })
    }, [countryId])

    /* useEffect(() => {
        const exisintUserIds = users.map(user => user._id)
        const missingUserIds = govUserIds.filter(id => !exisintUserIds.includes(id))
        if (missingUserIds.length) {
            dispatch(addUsers({ userIds: missingUserIds, chunksize: 800 }))
        }
    }, [govUserIds]) */

    const nowVal = (unrest.bar / unrest.barMax) * 100



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
            </div>
        </Row>
    )

}


export default CountryPolitics