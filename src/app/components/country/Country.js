import React from "react"
import { useSelector } from "react-redux"
import Alert from "react-bootstrap/Alert"
import CountryRanking from "./CountryRanking"
import CountryStrategicResources from "./CountryStrategicResources"
import SimpleStats from "../SimpleStats"
import CountryDiplomacy from "./CountryDiplomacy"
import CountryEconomy from "./CountryEconomy"
import CountryPolitics from "./CountryPolitics"

/* 

{
    taxes: {
      income: 1,
      market: 1,
      selfWork: 1
    },
    _id: '6813b6d546e731854c7ac85c',
    name: 'Bolivia',
    code: 'bo',
    money: 105.05249999999995,
    orgs: [
      '6813b6f23e57e0601e792d9c'
    ],
    allies: [
      '6813b6d546e731854c7ac838',
      '6813b6d446e731854c7ac7b6',
      '6813b6d446e731854c7ac7aa',
      '6813b6d446e731854c7ac7a8',
      '6873d0ea1758b40e712b5f5c',
      '6813b6d546e731854c7ac858'
    ],
    warsWith: [
      '6813b6d546e731854c7ac83c',
      '683ddd2c24b5a2e114af15d7',
      '6813b6d546e731854c7ac842',
      '6813b6d446e731854c7ac7e8',
      '6813b6d546e731854c7ac832'
    ],
    scheme: 'yellow',
    mapAccent: 'normal',
    __v: 44,
    rankings: {
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
    },
    updatedAt: '2026-02-08T06:00:04.114Z',
    development: 14.589614530785866,
    specializedItem: 'limestone',
    enemy: '6813b6d546e731854c7ac852'
}


*/

export const Country = props => {

  /* const { taxes, _id, name, code, money, orgs, allies, warsWith, scheme, mapAccent, __v,
      rankings, updatedAt, development, specializedItem, enemy
  } = props */

  const { name, discordUrl, taxes, money, development, specializedItem,
    rankings, strategicResources, allies, warsWith, enemy,
    rulingParty, unrest, code, _id: countryId,
    ...simpleStatsProps } = props

  const diplomacyProps = { allies, warsWith, enemy }
  const economyProps = { taxes, money, development, specializedItem }
  const politicsProps = { rulingParty, unrest, countryId }

  return (
    <>
      <img
        alt={name}
        src={`https://app.warera.io/images/flags/${code}.svg?v=16`} />
      <span>{name}</span>
      <a href={discordUrl} target="_blank">{discordUrl}</a>
      <CountryPolitics {...politicsProps} />
      <CountryDiplomacy {...diplomacyProps} />
      <CountryEconomy {...economyProps} />
      {/* <SimpleStats {...simpleStatsProps} /> */}
      <CountryStrategicResources {...strategicResources} />
      <CountryRanking {...rankings} />
    </>
  )

}

export default Country