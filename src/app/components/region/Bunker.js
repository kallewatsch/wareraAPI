import React from "react"
import { GiShield, GiAlarmClock } from "react-icons/gi"


export const Bunker = (props) => {
    const { willBeActiveAt, level, status } = props || {}

    const foo = new Date(willBeActiveAt).toLocaleString()

    return (
        <span>
            <GiShield className={status == 'active' ? 'icon-green' : status == 'disabled' ? 'icon-red' : 'icon-gray'} />{level}
            {willBeActiveAt && <><GiAlarmClock />{foo}</>}
        </span>
    )
}


export default Bunker