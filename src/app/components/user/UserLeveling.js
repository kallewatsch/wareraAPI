import React from "react"
import { IconContext } from "react-icons"
import { GiReturnArrow, GiShield, GiGlobe, GiChart, GiGreekTemple } from "react-icons/gi"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import Badge from "react-bootstrap/Badge"
import "./UserInfos.css"
import IconsWithOverlay from "../util/IconsWithOverlay"



export const UserInfos = (props) => {

    const {
        level,
        totalXp,
        dailyXpLeft,
        availableSkillPoints,
        spentSkillPoints,
        totalSkillPoints,
        freeReset
    } = props

    const txts = [
        `Can reset ${freeReset} times`
    ]

    return (
        <IconsWithOverlay providerValue={{ size: '2em' }} txts={txts}>
            <Badge bg="dark">{freeReset}<GiReturnArrow className={freeReset ? 'icon-green' : 'icon-gray'} /></Badge>
        </IconsWithOverlay>

    )

}


export default UserInfos