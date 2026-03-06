import React from "react"
import { GiRoundStar, GiShield, GiGlobe, GiChart, GiGreekTemple, GiCongress, GiConvict, GiHandcuffs } from "react-icons/gi"
import "./UserInfos.css"
import IconsWithOverlay from "../util/IconsWithOverlay"


export const UserInfos = (props) => {

    const {
        presidentOf,
        vicePresidentOf,
        minOfDefenseOf,
        minOfEconomyOf,
        minOfForeignAffairsOf,
        congressMemberOf,
        countryName,
        isBanned
    } = props

    const availablTexts = [
        `Banned User`,
        `Gottem!`,
        `President ${countryName}`,
        `Vice President ${countryName}`,
        `Minister of Defense ${countryName}`,
        `Minister of Economics ${countryName}`,
        `Minister of Foreign Affairs ${countryName}`,
        `Member of Congress ${countryName}`,
        `Member of Congress (alernative icon) ${countryName}`,
    ]

    const availableIcons = [
        [isBanned, <GiConvict className="icon-red" />],
        [isBanned, <GiHandcuffs />],
        [presidentOf, <GiRoundStar className="icon-gold" />],
        [vicePresidentOf, <GiRoundStar className="icon-silver" />],
        [minOfDefenseOf, <GiShield className="icon-red" />],
        [minOfEconomyOf, <GiChart className="icon-green" />],
        [minOfForeignAffairsOf, <GiGlobe className="icon-blue" />],
        [congressMemberOf, <GiGreekTemple className="icon-gray" />],
        [congressMemberOf, <GiCongress className="icon-gray" />],
    ]

    const icons = availableIcons.filter(x => x[0]).map(x => x[1])
    const txts = availablTexts.filter((x, i) => availableIcons[i]?.[0])

    return (
        <IconsWithOverlay providerValue={{ size: "2em" }} txts={txts}>
            {icons}
        </IconsWithOverlay>

    )

}


export default UserInfos