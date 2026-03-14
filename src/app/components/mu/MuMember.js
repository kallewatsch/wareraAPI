import React from "react"
import { useSelector } from "react-redux"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import Badge from "react-bootstrap/Badge"
import { GiFirstAidKit, GiCuckooClock, GiCrown, GiFrogPrince, GiFrog } from "react-icons/gi";
import IconsWithOverlay from "../util/IconsWithOverlay";

// this is basicly as User. Move it to user folder?

export const foo = (datestring) => {
    const d = new Date(datestring)
    return `${d.toLocaleString()}`
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
    const { mu: muConf } = config || { helpCooldownHours: 12 }

    const d = new Date(lastConnectionAt)
    const { canAsk, cooldownHours } = canAskForHelp(lastHelpAskedAt, muConf?.helpCooldownHours)

    const txts = [
        isCommander ? 'Commander' : 'Member',
        'Last Online',
        canAsk ? 'Can ask for Help' : 'Can not ask for Help'
    ]

    return (
        <IconsWithOverlay providerValue={{ size: "2em" }} txts={txts}>
            <span>{isCommander ? <GiFrogPrince /> : <GiFrog />}{username}</span>
            <span><GiCuckooClock />{foo(d)}</span>
            <span><GiFirstAidKit className={canAsk ? 'icon-green' : 'icon-gray'} />{cooldownHours}h</span>
        </IconsWithOverlay>

    )

}


export default MuMember