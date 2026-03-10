import React from "react"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from "react-bootstrap/Tooltip"
import { GiShield, GiAlarmClock } from "react-icons/gi"
import { getUpgradeClassName, getTimeDeltaHours } from "./RegionUpgrades"


export const Bunker = (props) => {
    const { willBeActiveAt, level, status, _id } = props || {}

    const timedeltaHours = willBeActiveAt && getTimeDeltaHours(willBeActiveAt)

    const foo = new Date(willBeActiveAt).toLocaleString()

    const renderTooltip = (_props, id, txt) => <Tooltip id={id} {..._props}>{txt}</Tooltip>

    const tooltipId = _id + 'level'
    const tooltipTxt = `Bunker Level ${level || 0} ${status || 'No Bunker'}`

    const tooltipPendingId = _id + 'status'
    const tooltipPendingTxt = `Bunker is active in ${timedeltaHours} hours at ${foo}`

    return (
        <>
            <OverlayTrigger overlay={(_props) => renderTooltip(_props, tooltipId, tooltipTxt)}>
                <span><GiShield className={getUpgradeClassName(status)} />{level}</span>
            </OverlayTrigger>

            {willBeActiveAt && status == "pending" &&
                <OverlayTrigger overlay={(_props) => renderTooltip(_props, tooltipPendingId, tooltipPendingTxt)}>
                    <span><GiAlarmClock />{timedeltaHours}h</span>
                </OverlayTrigger>
            }
        </>
    )
}


export default Bunker