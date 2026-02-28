import React from "react"
import { useSelector } from "react-redux"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import Badge from "react-bootstrap/Badge"
import { GiFirstAidKit, GiCuckooClock, GiCrown } from "react-icons/gi";

// this is basicly as User. Move it to user folder?

export const foo = (datestring) => {
    const d = new Date(datestring)
    return `${d.toLocaleDateString()} | ${d.toLocaleTimeString()}`
}

export const canAskForHelp = (lastHelpAskedAt, cooldownHours) => {
    const now = Date.now()
    const past = new Date(lastHelpAskedAt)
    const timeDeltaHours = (now - past) / (3600 * 1000)
    return ({ canAsk: timeDeltaHours >= cooldownHours, cooldownHours: timeDeltaHours.toFixed(1) })
}

export const MuMember = (props) => {

    const { username, dates, isCommander } = props
    const { lastHelpAskedAt, lastConnectionAt } = dates || {}

    const { config } = useSelector(state => state.app)
    const { mu: muConf } = config || {}

    const d = new Date(lastConnectionAt)
    const { canAsk, cooldownHours } = canAskForHelp(lastHelpAskedAt, muConf?.helpCooldownHours)

    return (
        <ListGroupItem className="mu-member">
            {isCommander && <Badge text="gold" bg="dark"><GiCrown /></Badge>}{username}
            <Badge bg="secondary"><GiCuckooClock />{foo(d)}</Badge>
            <Badge bg={canAsk ? 'success' : 'danger'}><GiFirstAidKit />{cooldownHours}h</Badge>
        </ListGroupItem>
    )

}


export default MuMember