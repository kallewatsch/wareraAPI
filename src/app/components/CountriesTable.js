import React from "react"
import Table from "react-bootstrap/Table"

export const foo = (data) => {
    if (!data || !data.value) {
        return "-"
    }
    const intVal = parseInt(data.value)
    if (intVal != 'NaN') {
        return Math.round(intVal)
    }
    return data.value
}

export const CountriesRankingTable = props => {

    const { countries } = props
    console.log(countries)

    const theaders = ["countryRegionDiff", "countryDamages", "weeklyCountryDamages",
        "weeklyCountryDamagesPerCitizen", "countryDevelopment", "countryActivePopulation",
        "countryWealth", "countryBounty", "countryProductionBonus"]


    /* 
    const { countryRegionDiff, countryDamages, weeklyCountryDamages,
        weeklyCountryDamagesPerCitizen, countryDevelopment, countryActivePopulation,
        countryWealth, countryBounty, countryProductionBonus
    } = props
    */

    return (
        <Table>
            <thead>
                <tr>
                    <th>country</th>
                    {theaders.map((txt, i) => <th key={i}>{txt.toLowerCase().replace("country", "")}</th>)}
                </tr>
            </thead>
            <tbody>
                {countries && countries.map((country, i) => {
                    return (
                        <tr key={i}>
                            <td><img
                                alt={country.name}
                                src={`https://app.warera.io/images/flags/${country.code}.svg?v=16`} />{country.name}</td>
                            {theaders.map((x, j) => {
                                return (
                                    <td key={j}>{foo(country.rankings[x])}</td>
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