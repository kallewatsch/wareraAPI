import React from "react"
import { IconContext } from "react-icons"
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

export const getTimeDeltaHours = (willBeActiveAt) => {
    const activeDate = new Date(willBeActiveAt)
    const now = Date.now()
    return Math.floor((activeDate - now) / (3600 * 1000))
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
        <IconContext.Provider value={{size: "2em"}}>
            <Bunker {...bunkerData} />
            <Base {...baseData} />
            <PacificationCenter {...pacificationCenterData} />
        </IconContext.Provider>
        
    )

}


export default RegionUpgrades