import React from "react"
import { GiPeaceDove, GiAlarmClock } from "react-icons/gi"
import { getUpgradeClassName } from "./RegionUpgrades"


export const PacificationCenter = (props) => {
    const { willBeActiveAt, level, status } = props || {}

    const foo = new Date(willBeActiveAt).toLocaleString()

    return (
        <span>
            <GiPeaceDove className={getUpgradeClassName(status)} />{level}
            {willBeActiveAt && <><GiAlarmClock />{foo}</>}
        </span>
    )
}


export default PacificationCenter