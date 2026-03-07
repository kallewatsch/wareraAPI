import React from "react"
import IconsWithOverlay from "../util/IconsWithOverlay"
import Bunker from "./Bunker"
import Base from "./Base"
import PacificationCenter from "./PacificationCenter"

export const getUpgradeClassName = (status) => {
    switch (status) {
        case 'active':
            return 'icon-green'
        case 'disabled':
            return 'icon-red'
        case 'pending':
            return 'icon-gold'
        default:
            return 'icon-gray'
    }
}

export const RegionUpgrades = (props) => {

    const { regionUpgrades } = props || []

    const bunkerData = regionUpgrades.find(x => x.upgradeType == "bunker")
    const baseData = regionUpgrades.find(x => x.upgradeType == "base")
    const pacificationCenterData = regionUpgrades.find(x => x.upgradeType == "pacificationCenter")

    const txts = [
        "Bunker", "Military Base", "Pacification Center"
    ]

    return (
        <IconsWithOverlay providerValue={{size: "2em"}} txts={txts}>
            <Bunker {...bunkerData} />
            <Base {...baseData} />
            <PacificationCenter {...pacificationCenterData} />
        </IconsWithOverlay>
    )

}


export default RegionUpgrades