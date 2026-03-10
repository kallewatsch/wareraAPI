import React from "react"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from "react-bootstrap/Tooltip"
import { GiPeaceDove, GiAlarmClock } from "react-icons/gi"
import { getUpgradeClassName, getTimeDeltaHours } from "./RegionUpgrades"


export const PacificationCenter = (props) => {
    const { willBeActiveAt, level, status, _id } = props || {}

    const foo = new Date(willBeActiveAt).toLocaleString()
    const timedeltaHours = willBeActiveAt && getTimeDeltaHours(willBeActiveAt)

    const renderTooltip = (_props, id, txt) => <Tooltip id={id} {..._props}>{txt}</Tooltip>

    const tooltipId = _id + 'level'
    const tooltipTxt = `Pacification Center Level ${level || 0} ${status || 'No Pacification Center'}`

    const tooltipPendingId = _id + 'status'
    const tooltipPendingTxt = `Pacification Center active in ${timedeltaHours} hours at ${foo}`

    return (
        <>
            <OverlayTrigger overlay={(_props) => renderTooltip(_props, tooltipId, tooltipTxt)}>
                <span><GiPeaceDove className={getUpgradeClassName(status)} />{level}</span>
            </OverlayTrigger>

            {willBeActiveAt && status == "pending" &&
                <OverlayTrigger overlay={(_props) => renderTooltip(_props, tooltipPendingId, tooltipPendingTxt)}>
                    <span><GiAlarmClock />{timedeltaHours}h</span>
                </OverlayTrigger>
            }
        </>
    )
}


export default PacificationCenter