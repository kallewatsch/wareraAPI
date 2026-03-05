import React from "react"
import { IconContext } from "react-icons"
import { GiRoundStar, GiShield, GiGlobe, GiChart, GiGreekTemple } from "react-icons/gi"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import "./UserInfos.css"


export const UserInfos = (props) => {

    const {
        presidentOf,
        vicePresidentOf,
        minOfDefenseOf,
        minOfEconomyOf,
        minOfForeignAffairsOf,
        congressMemberOf,
        countryName
    } = props

    const renderTooltip = (props, txt) => (
        <Tooltip id="button-tooltip" {...props}>
            {txt}
        </Tooltip>
    );

    return (
        <IconContext.Provider value={{ size: "2em" }}>
            {presidentOf && (
                <OverlayTrigger overlay={(props) => renderTooltip(props, `President ${countryName}`)}>
                    <GiRoundStar className="icon-gold" />
                </OverlayTrigger>
            )}
            {vicePresidentOf && (
                <OverlayTrigger overlay={(props) => renderTooltip(props, `Vice President ${countryName}`)}>
                    <GiRoundStar className="icon-silver" />
                </OverlayTrigger>
            )}
            {minOfDefenseOf && (
                <OverlayTrigger overlay={(props) => renderTooltip(props, `Minister of Defense ${countryName}`)}>
                    <GiShield className="icon-red" />
                </OverlayTrigger>
            )}
            {minOfEconomyOf && (
                <OverlayTrigger overlay={(props) => renderTooltip(props, `Minister of Economy ${countryName}`)}>
                    <GiChart className="icon-green" />
                </OverlayTrigger>
            )}
            {minOfForeignAffairsOf && (
                <OverlayTrigger overlay={(props) => renderTooltip(props, `Minister of Foreign Affairs ${countryName}`)}>
                    <GiGlobe className="icon-blue" />
                </OverlayTrigger>
            )}
            {congressMemberOf && (
                <OverlayTrigger overlay={(props) => renderTooltip(props, `Congress Member ${countryName}`)}>
                    <GiGreekTemple className="icon-gray" />
                </OverlayTrigger>
            )}
        </IconContext.Provider>
    )

}


export default UserInfos