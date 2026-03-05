import React from "react"
import { GiRoundStar, GiShield, GiGlobe, GiChart, GiGreekTemple } from "react-icons/gi"
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
        countryName
    } = props

    const availablTexts = [
        `President ${countryName}`,
        `Vice President ${countryName}`,
        `Minister of Defense ${countryName}`,
        `Minister of Economics ${countryName}`,
        `Minister of Foreign Affairs ${countryName}`,
        `Member of Congress ${countryName}`
    ]

    const availableIcons = [
        [presidentOf, <GiRoundStar className="icon-gold" />],
        [vicePresidentOf, <GiRoundStar className="icon-silver" />],
        [minOfDefenseOf, <GiShield className="icon-red" />],
        [minOfEconomyOf, <GiChart className="icon-green" />],
        [minOfForeignAffairsOf, <GiGlobe className="icon-blue" />],
        [congressMemberOf, <GiGreekTemple className="icon-gray" />],
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