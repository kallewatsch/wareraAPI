import React, { useState } from "react"
import Table from "react-bootstrap/Table"
import "./CountriesTable.css"

export const humanReadable = (data) => {
    if (!data || !data.value) {
        return "-"
    }
    const intVal = parseInt(data.value)
    if (intVal != 'NaN') {
        return Math.round(intVal).toLocaleString()
    }
    return data.value
}

export const getRankingSum = (arr, key) => {
    return arr.reduce((acc, cur) => acc + (cur.rankings[key] ? cur.rankings[key].value : 0), 0)
}

export const CountriesRankingTable = props => {

    const { countries, variant } = props
    const [sortedCountries, setSortedCountries] = useState(countries)

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

    const handleSortTable = (event, key) => {
        const sortedCunts = [...countries].sort((a, b) => {
            if (!a.rankings[key]) {
                return -1
            }
            if (!b.rankings[key]) {
                return 1
            }
            return a.rankings[key].value > b.rankings[key].value ? 1 : a.rankings[key].value < b.rankings[key].value ? -1 : 0
        })

        if (sortedCountries.every((item, i) => sortedCunts[i] && item._id == sortedCunts[i]._id)) {
            setSortedCountries(sortedCunts.reverse())
        }
        else {
            setSortedCountries(sortedCunts)
        }

    }

    const handleToggleCountry = (event, id) => {
        console.log("maybe soon")
    }

    const rankingSumAndAverages = theaders.map((key, i) => ({
        key, value: getRankingSum(countries, key)
    }))

    return (
        <Table variant={variant} striped size="sm" className="countriesTable">
            <thead>
                <tr>
                    <th>Country</th>
                    {theaders.map((txt, i) => <th onClick={event => handleSortTable(event, txt)} key={i}>{shortTheaders[txt]}</th>)}
                </tr>
                <tr></tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>All Countries</b></td>
                    {rankingSumAndAverages.map((x, i) => <td key={i}>{humanReadable(x)}</td>)}
                </tr>
                {sortedCountries && sortedCountries.map((country, i) => {
                    return (
                        <tr key={i}>
                            <td onClick={event => handleToggleCountry(event, country._id)}><img
                                alt={country.name}
                                src={`https://app.warera.io/images/flags/${country.code}.svg?v=16`} />{country.name}</td>
                            {theaders.map((x, j) => {
                                return (
                                    <td key={j}>{humanReadable(country.rankings[x])}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )

}


export default CountriesRankingTable