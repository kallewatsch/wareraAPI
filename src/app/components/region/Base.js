import React from "react"
import { GiBroadsword, GiAlarmClock } from "react-icons/gi"
import { getUpgradeClassName } from "./RegionUpgrades"


export const Base = (props) => {
    const { willBeActiveAt, level, status } = props || {}

    const foo = new Date(willBeActiveAt).toLocaleString()

    return (
        <span>
            <GiBroadsword className={getUpgradeClassName(status)} />{level}
            {willBeActiveAt && <><GiAlarmClock />{foo}</>}
        </span>
    )
}


export default Base