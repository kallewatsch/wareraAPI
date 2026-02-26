import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLazyGetAnythingBatchedQuery } from "../../api"
import SimpleStats from "../SimpleStats"
import Ranking from "../ranking/Ranking"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import "./Mu.css"

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

    const { regions } = useSelector(state => state.app)
    const [users, setUsers] = useState([])
    const [getAnythingBatched, { data, error }] = useLazyGetAnythingBatchedQuery()

    useEffect(() => {
        if (!_id) return;

        const asyncFoo = async (allItems, cb) => {
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
        asyncFoo([...members, owner, ...roles.managers.filter(id => !members.includes(id))], setUsers)

    }, [_id])


    return (
        <Card>
            <Card.Header>
                <h1><img src={avatarUrl} />{name} | Region: {regions?.[regionId]?.name}</h1>
            </Card.Header>
            <Card.Body>
                <Row>
                    {Object.keys(rankings).map((key, i) => <Col key={i}><Ranking  {...rankings[key]} title={key} /></Col>)}
                </Row>
                {/* {Object.keys(rankings).map((key, i) => <Ranking key={i} {...rankings[key]} title={key} />)} */}
                <Row>
                    <Col>
                        <h6>Members</h6>
                        <ol>
                            {users && users
                                .sort((a, b) => roles.commanders.includes(a._id) ? -1 : 1)
                                .sort((a, b) => a._id == owner ? -1 : 0)
                                .sort((a, b) => roles.managers.includes(a._id) ? -1 : 0)
                                .map((member, i) => {
                                    const foo = roles.commanders.includes(member._id)
                                        ? 'commander'
                                        : owner == member._id
                                            ? 'owner'
                                            : roles.managers.includes(member._id) ? 'founder' : 'casual'
                                    return <li key={i} className={foo}>{member.username}</li>
                                })}

                        </ol>

                    </Col>
                    <Col>
                        <h6>Donors</h6>
                        <ol>
                            {investedMoneyByUsers && Object.keys(investedMoneyByUsers)
                                .map(key => ([key, investedMoneyByUsers[key]]))
                                .sort((a, b) => b[1] - a[1])
                                .map((userIdMoneyTpl, i) => {
                                    return (
                                        <li key={i}>{userIdMoneyTpl[0]}: {userIdMoneyTpl[1]}</li>
                                    )
                                })
                            }
                        </ol>
                    </Col>
                </Row>
                <SimpleStats {...otherProps} />
                {/* <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="other" title="Other">
                        <SimpleStats {...otherProps} />
                    </Tab>
                    <Tab eventKey="dates" title="Dates">
                        <SimpleStats {...dates} />
                    </Tab>
                    <Tab eventKey="leveling" title="Leveling">
                        <SimpleStats {...leveling} />
                    </Tab>
                    <Tab eventKey="skills" title="Skills">
                        <UserSkills {...skills} />
                    </Tab>
                    <Tab eventKey="rankings" title="Rankings">
                        <UserRankings {...rankings} />
                    </Tab>
                    <Tab eventKey="inventory" title="Inventory">
                        <UserInventory userId={props._id} />
                    </Tab>
                </Tabs> */}
            </Card.Body>
            <Card.Footer></Card.Footer>
        </Card>
    )

}

export default Mu