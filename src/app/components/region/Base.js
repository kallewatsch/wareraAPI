import React from "react"
import { GiBroadsword, GiAlarmClock } from "react-icons/gi"


export const Base = (props) => {
    const { willBeActiveAt, level, status } = props || {}

    const foo = new Date(willBeActiveAt).toLocaleString()

    return (
        <span>
            <GiBroadsword className={status == 'active' ? 'icon-green' : status == 'disabled' ? 'icon-red' : 'icon-gray'} />{level}
            {willBeActiveAt && <><GiAlarmClock />{foo}</>}
        </span>
    )
}


export default Base