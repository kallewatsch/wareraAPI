import React, { useState } from "react"
import { useSelector } from 'react-redux'
import Row from "react-bootstrap/Row"
import SortableTable from "./util/SortableTable"
import { getCanAttackTimes, getExpectedAttackCost, getExpectedDamage, getHoursUntilLastOnline } from "../utils/fooStuff"
import SortableTableWithTabs from "./util/SortableTableWithTabs"

export const getUpgradesData = (upgrades) => {
    return ({
        total: upgrades.length,
        pending: upgrades.filter(upgrade => upgrade.status == "pending").length,
        active: upgrades.filter(upgrade => upgrade.status == "active").length,
        disabled: upgrades.filter(upgrade => upgrade.status == "disabled").length,
    })
}

export const Countries = () => {

    const { countries, users, regions, upgrades, isLoading } = useSelector(state => state.app)

    // [...countries].map() to assign some wicked values. See intel/Intel
    const extendedCountries = [...countries].map(country => {

        const extendedUsers = users.filter(user => user.country == country?._id).map((user =>
            Object.assign(
                {},
                { ...user },
                {
                    extended: {
                        expDmg: getExpectedDamage({ ...user?.skills }),
                        expAttCost: getExpectedAttackCost({ ...user?.skills }, false),
                        canAttackTimes: getCanAttackTimes({ ...user?.skills }),
                        availableDmg: getExpectedDamage({ ...user?.skills }) * getCanAttackTimes({ ...user?.skills }),
                        hoursUntilLastOnline: getHoursUntilLastOnline(user?.dates?.lastConnectionAt)
                    }
                }
            )
        ))

        const extendedUsersWithBan = extendedUsers.filter(user => user.infos?.isBanned)
        const extendedUsersWithoutBan = extendedUsers.filter(user => !user.infos?.isBanned)

        const totalAvailableCountryDmg = Math.round(extendedUsersWithoutBan.reduce((acc, curr) => acc + curr.extended.availableDmg, 0))//.toLocaleString()
        const totalAvailableCountryDmgBan = Math.round(extendedUsersWithBan.reduce((acc, curr) => acc + curr.extended.availableDmg, 0))//.toLocaleString()
        const totalAvailableCountryDmgTotal = Math.round(extendedUsers.reduce((acc, curr) => acc + curr.extended.availableDmg, 0))//.toLocaleString()

        const countryRegionIds = Object.keys(regions).filter(key => regions[key].country == country._id)
        const countryRegionUprades = upgrades.filter(upgrade => countryRegionIds.some(regionId => regionId == upgrade.region))

        const bunkerUpgrades = countryRegionUprades.filter(upgrade => upgrade.upgradeType == "bunker")
        const baseUpgrades = countryRegionUprades.filter(upgrade => upgrade.upgradeType == "base")
        const pacificationCenterUpgrades = countryRegionUprades.filter(upgrade => upgrade.upgradeType == "pacificationCenter")

        return Object.assign(
            {},
            { ...country },
            {
                extended: {
                    totalAvailableCountryDmg,
                    totalAvailableCountryDmgBan,
                    totalAvailableCountryDmgTotal,
                    bunkers: getUpgradesData(bunkerUpgrades),
                    bases: getUpgradesData(baseUpgrades),
                    pacificationCenters: getUpgradesData(pacificationCenterUpgrades)
                }
            })
    })

    const thsBunkers = [
        { txt: "Name", attrPath: "", target: "name" },
        { txt: "Total Bunkers", attrPath: ["extended", "bunkers"], target: "total" },
        { txt: "Pending Bunkers", attrPath: ["extended", "bunkers"], target: "pending" },
        { txt: "Active Bunkers", attrPath: ["extended", "bunkers"], target: "active" },
        { txt: "Disabled Bunkers", attrPath: ["extended", "bunkers"], target: "disabled" },
    ]

    const thsBases = [
        { txt: "Name", attrPath: "", target: "name" },
        { txt: "Total Military Bases", attrPath: ["extended", "bases"], target: "total" },
        { txt: "Pending Military Bases", attrPath: ["extended", "bases"], target: "pending" },
        { txt: "Active Military Bases", attrPath: ["extended", "bases"], target: "active" },
        { txt: "Disabled Military Bases", attrPath: ["extended", "bases"], target: "disabled" },
    ]

    const thsPacificationCenters = [
        { txt: "Name", attrPath: "", target: "name" },
        { txt: "Total Pacification Centers", attrPath: ["extended", "pacificationCenters"], target: "total" },
        { txt: "Pending Pacification Centers", attrPath: ["extended", "pacificationCenters"], target: "pending" },
        { txt: "Active Pacification Centers", attrPath: ["extended", "pacificationCenters"], target: "active" },
        { txt: "Disabled Pacification Centers", attrPath: ["extended", "pacificationCenters"], target: "disabled" },
    ]

    const thsBla = [
        { txt: "Name", attrPath: "", target: "name" },
        { txt: "Available Damage (No Food)", attrPath: ["extended"], target: "totalAvailableCountryDmg" },
    ]

    const thsFoo = [
        { txt: "Name", attrPath: "", target: "name" },
        { txt: "Region Diff", attrPath: ["rankings", "countryRegionDiff"], target: "value" },
        { txt: "Damages", attrPath: ["rankings", "countryDamages"], target: "value" },
        { txt: "Weekly Damages", attrPath: ["rankings", "weeklyCountryDamages"], target: "value" },
        { txt: "Damage per Citizen", attrPath: ["rankings", "weeklyCountryDamagesPerCitizen"], target: "value" },
        { txt: "Development (rankings)", attrPath: ["rankings", "countryDevelopment"], target: "value" },
        { txt: "Active Population", attrPath: ["rankings", "countryActivePopulation"], target: "value" },
        { txt: "Wealth", attrPath: ["rankings", "countryWealth"], target: "value" },
        { txt: "Bounty", attrPath: ["rankings", "countryBounty"], target: "value" },
        { txt: "Production Bonus", attrPath: ["rankings", "countryProductionBonus"], target: "value" },
        { txt: "Development", attrPath: "", target: "development" },
        { txt: "Specialized Item", attrPath: "", target: "specializedItem" },
    ]

    const tabs = [
        { name: "Bunkers", ths: thsBunkers },
        { name: "Military Bases", ths: thsBases },
        { name: "Pacification Centers", ths: thsPacificationCenters },
        { name: "Bla", ths: thsBla },
        { name: "Foo", ths: thsFoo }
    ]

    return <>
        {!isLoading && countries?.length && <Row>
            {/* <Button onClick={handleSetThMode}>toggle mode</Button> */}
            <h5>Countries{/* : | current mode: <Badge bg={thMode} txt={thMode}>{thMode}</Badge> */}</h5>
            {/* <SortableTable items={[...extendedCountries]} ths={[...ths]} component="country" /> */}
            <SortableTableWithTabs items={[...extendedCountries]} tabs={tabs} component="country" /* key={`${thMode}`} */ />
        </Row>}
    </>
}

export default Countries