import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import SimpleStats from "../SimpleStats"
import Ranking from "../ranking/Ranking"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"
import MuMember from "./MuMember"
import MuDonor from "./MuDonor"
import "./Mu.css"
//import MuTransaction from "./MuTransactions"
import { GiFoundryBucket } from "react-icons/gi"
import { ListGroupItem } from "react-bootstrap"
import { addUsers, selectUsers } from "../../slices/usersSlice"
import { CHUNKSIZES } from "../../config"


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

    console.log("dem propso", props)

    const { managers, commanders } = roles || { managers: [], commanders: [] }

    const { regions, users } = useSelector(state => state.app)

    const donorIds =  investedMoneyByUsers ? Object.keys(investedMoneyByUsers) : []
    console.log({donorIds})

    const memberUsers = useSelector(state => selectUsers(state.app, members)).sort((a, b) => commanders.includes(a._id) ? -1 : commanders.includes(b._id) ? - 1 : 0)
    const founderUsers = useSelector(state => selectUsers(state.app, managers))
    const ownerUsers = useSelector(state => selectUsers(state.app, [owner]))
    const donorUsers = useSelector(state => selectUsers(state.app, donorIds))
    console.log(donorUsers)
    const dispatch = useDispatch()

    useEffect(() => {
        //const donors = investedMoneyByUsers ? Object.keys(investedMoneyByUsers).map(key => investedMoneyByUsers[key]) : []
        const muUserIds = [...new Set([owner, ...managers, ...commanders, ...members])]
        const exisintUserIds = users.map(user => user._id)
        const missingUserIds = muUserIds.filter(id => !exisintUserIds.includes(id))
        const chunksize = CHUNKSIZES.getUserLite
        if (missingUserIds.length) {
            dispatch(addUsers({ userIds: missingUserIds, chunksize }))
        }
    }, [])

    /* const memberUsers = users.filter(user => members.includes(user._id))
        .sort((a, b) => commanders.includes(a._id) ? -1 : commanders.includes(b._id) ? - 1 : 0)
    const founderUsers = users.filter(user => managers.includes(user._id))
    const ownerUsers = users.filter(user => owner == user._id) */
    /* const donorUsers = users.filter(user => investedMoneyByUsers?.hasOwnProperty(user._id))
        .sort((a, b) => {
            const aVal = investedMoneyByUsers?.[a._id]
            const bVal = investedMoneyByUsers?.[b._id]
            return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
        })
 */
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
                            {memberUsers.map((user, i) => <MuMember key={i} {...user} isCommander={commanders.includes(user._id)} />)}
                        </ListGroup>
                    </Col>
                    {/* <Col>
                        <ListGroup>
                            {founderUsers.map((user, i) => <ListGroupItem key={i}><GiFoundryBucket size="2em" />{user.username}</ListGroupItem>)}
                            {memberUsers.map((user, i) => <ListGroupItem key={i}><MuMember {...user} isCommander={commanders.includes(user._id)} /></ListGroupItem>)}
                        </ListGroup>
                    </Col> */}
                    <Col>
                        <h6>Donors</h6>
                        {/* <MuTransaction muId={_id} /> */}
                        <ListGroup>
                            {donorUsers.map((user, i) => <MuDonor key={i} username={user.username} amount={investedMoneyByUsers?.[user._id]} />)}
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