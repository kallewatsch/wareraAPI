import React, { useState } from "react"
import { useSelector } from 'react-redux'
import Button from "react-bootstrap/Button"
import Accordion from "react-bootstrap/Accordion"
import Alert from "react-bootstrap/Alert"
import Region from "./Region"
import SortableTable from "./util/table/SortableTable"

export const Regions = () => {

    const { regions, countries, upgrades, isLoading } = useSelector(state => state.app)
    const [activeKey, setActiveKey] = useState()



    // TODO: proper scrollIntoView, current one scrolls in the middle of the open accordion
    const handleSetActiveKeyAndScroll = key => {
        if (key == activeKey || !key) {
            setActiveKey("")
        } else {
            setActiveKey(key)
            setTimeout(() => {
                const el = document.getElementById(key)
                el.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                })
            }, 500)
        }
    }

    const sortedRegions = regions && Object.keys(regions)
        .map(region => regions[region])
        .sort((a, b) => a.code > b.code ? 1 : a.code < b.code ? -1 : 0)

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
        {/* <Alert variant="warning">Regions don't contain information about strategic resources but the country does?! WIP</Alert>
        <Accordion activeKey={activeKey} onSelect={handleSetActiveKeyAndScroll}>
            {sortedRegions.map((region, i) => {
                let regionProps = Object.assign({}, { ...region }, { setActiveKeyAndScroll: handleSetActiveKeyAndScroll })
                return <Region key={i} {...regionProps} />
            })}
        </Accordion> */}
        {!isLoading && <SortableTable items={items} ths={ths} component="region" key={items.length} />}
    </>
}

export default Regions