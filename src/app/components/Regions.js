import React, { useState } from "react"
import { useSelector } from 'react-redux'
import SortableTable from "./util/table/SortableTable"


export const Regions = () => {

    const { regions, countries, upgrades, loading } = useSelector(state => state.app)

    const ths = [
        { txt: "Name", attrPath: [], target: "name" },
        { txt: "Capital", attrPath: [], target: "mainCity" },
        /* { txt: "Base Level (might be deprecated)", attrPath: ["upgradesV2", "upgrades", "base"], target: "level" },
        { txt: "Active Bunker Level (this one too)", attrPath: ["activeUpgradeLevels"], target: "bunker" },
        { txt: "Active Miltary Base Level (also deprecated)", attrPath: ["activeUpgradeLevels"], target: "base" }, */
        { txt: "Bunker Level", attrPath: ["extended"], target: "bunkerLevel" },
        { txt: "Bunker Status", attrPath: ["extended"], target: "bunkerStatus" },
        { txt: "Military Base Level", attrPath: ["extended"], target: "baseLevel" },
        { txt: "Military Base Status", attrPath: ["extended"], target: "baseStatus" },
        { txt: "Pacification Center Level", attrPath: ["extended"], target: "pacificationCenterLevel" },
        { txt: "Pacification Center Status", attrPath: ["extended"], target: "pacificationCenterStatus" },
        { txt: "Region Origin", attrPath: ["extended"], target: "regionCountryOrigin" },
        { txt: "Region Current", attrPath: ["extended"], target: "regionCountryCurrent" }
    ]
    const items = Object.keys(regions).map(key => {

        const region = regions[key]
        const regionUpgrades = upgrades.filter(upgrade => upgrade?.region == region._id)

        return Object.assign({}, { ...regions[key] }, {
            extended: {
                regionCountryOrigin: countries.find(country => country._id == region.initialCountry)?.name,
                regionCountryCurrent: countries.find(country => country._id == region.country)?.name,
                bunkerLevel: regionUpgrades?.find(upgrade => upgrade.upgradeType == "bunker")?.level,
                bunkerStatus: regionUpgrades?.find(upgrade => upgrade.upgradeType == "bunker")?.status,
                baseLevel: regionUpgrades?.find(upgrade => upgrade.upgradeType == "base")?.level,
                baseStatus: regionUpgrades?.find(upgrade => upgrade.upgradeType == "base")?.status,
                pacificationCenterLevel: regionUpgrades?.find(upgrade => upgrade.upgradeType == "pacificationCenter")?.level,
                pacificationCenterStatus: regionUpgrades?.find(upgrade => upgrade.upgradeType == "pacificationCenter")?.status
            }
        })
    })

    return <>
        {!loading.isLoading && <SortableTable items={items} ths={ths} component="region" key={items.length} />}
    </>
}

export default Regions