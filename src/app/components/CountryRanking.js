import React from "react"
import SimpleStats from "./SimpleStats"

/* 

{
      countryRegionDiff: {
        value: -1,
        rank: 57,
        tier: 'gold'
      },
      countryDamages: {
        value: 137616618,
        rank: 21,
        tier: 'platinum'
      },
      weeklyCountryDamages: {
        value: 24671822,
        rank: 14,
        tier: 'platinum'
      },
      weeklyCountryDamagesPerCitizen: {
        value: 2055985.1666666667,
        rank: 1,
        tier: 'master'
      },
      countryDevelopment: {
        value: 10.95,
        rank: 44,
        tier: 'gold'
      },
      countryActivePopulation: {
        value: 12,
        rank: 55,
        tier: 'gold'
      },
      countryWealth: {
        value: 164.97292999996625,
        rank: 154,
        tier: 'bronze'
      },
      countryBounty: {
        value: 41101.6463458,
        rank: 10,
        tier: 'platinum'
      },
      countryProductionBonus: {
        value: 0,
        rank: 64,
        tier: 'gold'
      }
    }

*/

export const CountryRanking = props => {

    const { countryRegionDiff, countryDamages, weeklyCountryDamages,
        weeklyCountryDamagesPerCitizen, countryDevelopment, countryActivePopulation,
        countryWealth, countryBounty, countryProductionBonus
    } = props

    return (
        <>
            <h1>Hello CountryRanking</h1>
            <SimpleStats {...props} />
        </>
    )

}


export default CountryRanking