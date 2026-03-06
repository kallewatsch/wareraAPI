import React, { useState } from "react"
import { useSelector } from 'react-redux'
import Row from "react-bootstrap/Row"
import SortableTable from "./util/SortableTable"
import { getCanAttackTimes, getExpectedAttackCost, getExpectedDamage, getHoursUntilLastOnline } from "../utils/fooStuff"


export const Countries = () => {

    const { countries, users } = useSelector(state => state.app)
    //const [thMode, setThMode] = useState('realtime')

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

        return Object.assign(
            {},
            { ...country },
            {
                extended: {
                    totalAvailableCountryDmg,
                    totalAvailableCountryDmgBan,
                    totalAvailableCountryDmgTotal
                }
            })
    })

    const ths = [
        { txt: "Name", attrPath: "", target: "name" },
        { txt: "Available Damage (No Food)", attrPath: ["extended"], target: "totalAvailableCountryDmg" },
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

    return <>
        {countries?.length && <Row>
            {/* <Button onClick={handleSetThMode}>toggle mode</Button> */}
            <h5>Countries{/* : | current mode: <Badge bg={thMode} txt={thMode}>{thMode}</Badge> */}</h5>
            <SortableTable items={[...extendedCountries]} ths={[...ths]} component="country" /* key={`${thMode}`} */ />
        </Row>}
    </>
}

export default Countries