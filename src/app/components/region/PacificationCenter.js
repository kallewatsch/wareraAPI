import React from "react"
import { GiPeaceDove, GiAlarmClock } from "react-icons/gi"


export const PacificationCenter = (props) => {
    const { willBeActiveAt, level, status } = props || {}

    const foo = new Date(willBeActiveAt).toLocaleString()

    return (
        <span>
            <GiPeaceDove className={status == 'active' ? 'icon-green' : status == 'disabled' ? 'icon-red' : 'icon-gray'} />{level}
            {willBeActiveAt && <><GiAlarmClock />{foo}</>}
        </span>
    )
}


export default PacificationCenter