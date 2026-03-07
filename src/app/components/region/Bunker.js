import React from "react"
import { GiShield, GiAlarmClock } from "react-icons/gi"
import { getUpgradeClassName } from "./RegionUpgrades"


export const Bunker = (props) => {
    const { willBeActiveAt, level, status } = props || {}

    const foo = new Date(willBeActiveAt).toLocaleString()

    return (
        <span>
            <GiShield className={getUpgradeClassName(status)} />{level}
            {willBeActiveAt && <><GiAlarmClock />{foo}</>}
        </span>
    )
}


export default Bunker