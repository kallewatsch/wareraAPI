import React from "react"
import { useSelector } from "react-redux"
import ProgressBar from "react-bootstrap/ProgressBar"
import { getRankingSum, rankingValueToHumanReadable } from "../../utils/arrayStuff"

export const StripedExample = () => {

    const { attackers, defenders } = useSelector(state => state.app.warplaner)
    const allAttackers = [...attackers.countries, ...attackers.allies]
    const allDefenders = [...defenders.countries, ...defenders.allies]

    const theaders = ["countryRegionDiff", "countryDamages", "weeklyCountryDamages",
        "weeklyCountryDamagesPerCitizen", "countryDevelopment", "countryActivePopulation",
        "countryWealth", "countryBounty", "countryProductionBonus"]

    const shortTheaders = {
        countryRegionDiff: "RegionDiff",
        countryDamages: "Dmg",
        weeklyCountryDamages: "DmgWeekly",
        weeklyCountryDamagesPerCitizen: "Dmg/Citizen",
        countryDevelopment: "Dev",
        countryActivePopulation: "Pop",
        countryWealth: "Wealth",
        countryBounty: "Bounty",
        countryProductionBonus: "ProdBon"
    }

    const attackerData = theaders.map((key, i) => ({
        key, value: getRankingSum(allAttackers.filter(country => attackers.excluded.every(id => id != country._id)), key)
    }))

    const defenderData = theaders.map((key, i) => ({
        key, value: getRankingSum(allDefenders.filter(country => defenders.excluded.every(id => id != country._id)), key)
    }))

    const barData = theaders.map(((key, i) => {
        const aVal = attackerData[i].value
        const bVal = defenderData[i].value
        const absVal = Math.abs(aVal - bVal)
        const now = aVal == bVal ? 50 : (Math.max(aVal, bVal) * 100) / (aVal + bVal)
        const variant = aVal > bVal ? "success" : aVal < bVal ? "danger" : "secondary"
        const label = `${shortTheaders[key]} +${rankingValueToHumanReadable(absVal)}`
        const props = {
            variant, now, label
        }
        return <ProgressBar key={i} {...props} className={variant == "danger" ? "progress justify-content-end" : ""} />
    }))

    return (
        <div>
            {barData}
        </div>
    );
}

export default StripedExample