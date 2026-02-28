import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLazyGetAnythingBatchedPostQuery, useLazyGetAnythingBatchedQuery } from "../../api"
import SimpleStats from "../SimpleStats"
import Ranking from "../ranking/Ranking"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"
import "./Mu.css"
import MuMember from "./MuMember"
import MuDonor from "./MuDonor"


export const foo = (datestring) => {
    const d = new Date(datestring)
    return `${d.toLocaleDateString()} | ${d.toLocaleTimeString()}`
}

export const Mu = props => {

    const {
        _id,
        region: regionId,
        avatarUrl,
        roles,
        members,
        rankings,
        name,
        user: owner,
        investedMoneyByUsers,
        ...otherProps
    } = props

    const { managers, commanders } = roles || {}

    const { regions, config } = useSelector(state => state.app)
    const [users, setUsers] = useState([])
    const [muUsers, setMuUsers] = useState({ members: [], commanders: [], donors: [], owner: {}, founder: {} })
    const [getAnythingBatched, { data, error }] = useLazyGetAnythingBatchedPostQuery()

    useEffect(() => {
        if (!_id) return;

        const asyncFoo = async (allItems) => {
            let allUsers = []
            const ep = 'user.getUserLite'

            while (allItems.length) {
                const chunk = allItems.splice(0, 200)
                const payload = {
                    endpoints: chunk.map(item => ep),
                    obj: Object.fromEntries(chunk.map((id, i) => [i, { userId: id }]))
                }
                const someUsers = await getAnythingBatched(payload).unwrap()
                allUsers = [...allUsers, ...someUsers]
            }
            setUsers(allUsers)
        }
        asyncFoo([
            owner,
            ...members.filter(id => id != owner),
            ...roles.managers.filter(id => !members.includes(id) && id != owner)
        ])

    }, [_id])

    const memberUsers = users.filter(user => members.includes(user._id))
        .sort((a,b) => commanders.includes(a._id) ? -1 : commanders.includes(b._id) ? - 1: 0)
    //const commanderUsers = users.filter(user => commanders.includes(user._id))
    const founderUsers = users.filter(user => managers.includes(user._id))
    const ownerUsers = users.filter(user => owner == user._id)
    const donorUsers = users.filter(user => investedMoneyByUsers?.hasOwnProperty(user._id))
        .sort((a,b) => {
            const aVal = investedMoneyByUsers?.[a._id]
            const bVal = investedMoneyByUsers?.[b._id]
            return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
        })

    return (
        <Card>
            <Card.Header>
                <h1><img src={avatarUrl} />{name} | Region: {regions?.[regionId]?.name}</h1>
            </Card.Header>
            <Card.Body>
                <Row>
                    {rankings && Object.keys(rankings).map((key, i) => <Col key={i}><Ranking  {...rankings[key]} title={key} /></Col>)}
                </Row>
                <Row>
                    <Col>
                        <h6>Founder</h6>
                        <ListGroup>
                            {founderUsers.map((user, i) => <MuMember key={i} {...user} />)}
                        </ListGroup>
                        <h6>Owner</h6>
                        <ListGroup>
                            {ownerUsers.map((user, i) => <MuMember key={i} {...user} />)}
                        </ListGroup>
                        {/* <h6>Commanders</h6>
                        <ListGroup>
                            {commanderUsers.map((user, i) => <MuMember key={i} {...user} />)}
                        </ListGroup> */}
                        <h6>Members</h6>
                        <ListGroup>
                            {memberUsers.map((user, i) => <MuMember key={i} {...user} isCommander={commanders.includes(user._id)}/>)}
                        </ListGroup>
                    </Col>
                    <Col>
                        <h6>Donors</h6>
                        <ListGroup>
                            {donorUsers.map((user,i) => <MuDonor key={i} username={user.username} amount={investedMoneyByUsers?.[user._id]} />)}
                        </ListGroup>
                    </Col>
                </Row>
                <SimpleStats {...otherProps} />
            </Card.Body>
            <Card.Footer></Card.Footer>
        </Card>
    )

}

export default Mu