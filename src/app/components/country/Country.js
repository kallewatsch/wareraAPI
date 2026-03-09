import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import Alert from "react-bootstrap/Alert"
import Accordion from "react-bootstrap/Accordion"
import { BsDiscord } from "react-icons/bs";
import CountryRanking from "./CountryRanking"
import CountryStrategicResources from "./CountryStrategicResources"
import SimpleStats from "../SimpleStats"
import CountryDiplomacy from "./CountryDiplomacy"
import CountryEconomy from "./CountryEconomy"
import CountryPolitics from "./CountryPolitics"
import { Badge, ListGroup, ListGroupItem } from "react-bootstrap";
import RegionUpgrades from "../region/RegionUpgrades";
import CountryRegions from "./CountryRegions";
//import { useLazyGetArticleQuery } from "../../api"

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

    const { name, discordUrl, taxes, money, development, specializedItem,
        rankings, strategicResources, allies, warsWith, enemy,
        rulingParty, unrest, code, _id: countryId,
        pinnedArticle: articleId,
        ...simpleStatsProps
    } = props

    const diplomacyProps = { allies, warsWith, enemy }
    const economyProps = { taxes, money, development, specializedItem }
    const politicsProps = { rulingParty, unrest, countryId }

    const { upgrades, regions } = useSelector(state => state.app)

    const countryRegions = Object.keys(regions).filter(key => regions[key].country == countryId).map(key => regions[key])
    const countryRegionsUpgrades = upgrades.filter(upgrade => countryRegions.some(region => region._id == upgrade.region))
    // getting the whole article possible but overkill at this point. need to sanitize the html etc. just put link to the article instead
    /* const [getArticle, { data: articleData, error, isLoading }] = useLazyGetArticleQuery()
  
    useEffect(() => {
        if (!articleId) return;
        getArticle({articleId})
    }, [articleId])
  
    console.log({articleData, error, isLoading})
  
    const article = articleData?.result?.data */

    return (
        <>
            <img
                alt={name}
                src={`https://app.warera.io/images/flags/${code}.svg?v=16`} />
            <span>{name}</span>
            <Badge bg={discordUrl ? 'primary' : 'secondary'}><BsDiscord /></Badge>{discordUrl ? <a href={discordUrl} target="_blank">{discordUrl}</a> : 'No Discord Server'}
            <CountryEconomy {...economyProps} />
            <CountryPolitics {...politicsProps} />
            <CountryRegions countryRegions={countryRegions} countryRegionsUpgrades={countryRegionsUpgrades} />
            <CountryDiplomacy {...diplomacyProps} />
            {/* <CountryStrategicResources {...strategicResources} /> */}
            <CountryRanking {...rankings} />
        </>
    )

}

export default Country