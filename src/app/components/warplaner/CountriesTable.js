import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Table from "react-bootstrap/Table"
import { setWarPlaner } from "../../appSlice"
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

    const { variant, team } = props
    const { warplaner } = useSelector(state => state.app)
    const side = warplaner[team]
    const { countries: cunts, allies, excluded } = side
    const countries = [...cunts, ...allies]
    const [sortedCountries, setSortedCountries] = useState(countries)

    const dispatch = useDispatch()

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
        const newExcludedIds = excluded.includes(id)
            ? excluded.filter(x => x != id)
            : [...excluded, id]
        const payload = Object.assign({}, {...warplaner}, {[team]: {ids: side.ids, countries: side.countries, allies: side.allies, excluded: newExcludedIds}})
        dispatch(setWarPlaner(payload))
    }

    const rankingSumAndAverages = theaders.map((key, i) => ({
        key, value: getRankingSum(countries.filter(country => excluded.every(id => id != country._id)), key)
    }))

    return (
        <Table variant={variant} size="sm" className="countriesTable">
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
                    const className = excluded.includes(country._id) ? 'tr-excluded' : ''
                    return (
                        <tr key={i} className={className}>
                            <td onClick={event => handleToggleCountry(event, country._id)}
                                className="countryflag-toggle"><img
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