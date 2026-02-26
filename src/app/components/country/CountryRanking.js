import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Ranking from "../ranking/Ranking"
import SimpleStats from "../SimpleStats"

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

  const {
    countryRegionDiff,
    countryDamages,
    weeklyCountryDamages,
    weeklyCountryDamagesPerCitizen,
    countryDevelopment,
    countryActivePopulation,
    countryWealth,
    countryBounty,
    countryProductionBonus
  } = props

  return (
    <>
      <Row>
        <Col><Ranking {...countryDamages} title="Damages" /></Col>
        <Col><Ranking {...weeklyCountryDamages} title="Weekly Damages" /></Col>
        <Col><Ranking {...countryWealth} title="Wealth" /></Col>
        <Col><Ranking {...weeklyCountryDamagesPerCitizen} title="Damage/Citzien" /></Col>
      </Row>
      <Row>
        <Col><Ranking {...countryDevelopment} title="Development" /></Col>
        <Col><Ranking {...countryRegionDiff} title="Region Diff" /></Col>
        <Col><Ranking {...countryActivePopulation} title="Population" /></Col>
        <Col><Ranking {...countryBounty} title="Bounty" /></Col>
        <Col><Ranking {...countryProductionBonus} title="Productions Bonus" /></Col>
      </Row>
    </>
  )

}


export default CountryRanking