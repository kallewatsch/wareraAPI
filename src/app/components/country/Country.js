import React from "react"
import SimpleStats from "../SimpleStats"

/* {
   "taxes":{
      "income":2,
      "market":2,
      "selfWork":3
   },
   "unrest":{
      "barMax":11694,
      "bar":0,
      "lastContributionAt":"2026-02-13T06:36:32.501Z"
   },
   "_id":"6813b6d446e731854c7ac79c",
   "name":"Germany",
   "code":"de",
   "money":302.90465000000097,
   "orgs":[
      "6813b6e73e57e0601e792aa9"
   ],
   "allies":[
      "6813b6d446e731854c7ac7f2",
      "6813b6d546e731854c7ac862",
      "6813b6d446e731854c7ac7c0",
      "6813b6d546e731854c7ac865",
      "6813b6d446e731854c7ac7ba"
   ],
   "warsWith":[
      
   ],
   "scheme":"gray",
   "mapAccent":"dark",
   "__v":64,
   "strategicResources":{
      "resources":{
         "coal":[
            "6813b7049403bc4170a5d6e1"
         ]
      },
      "bonuses":{
         "productionPercent":5,
         "developmentPercent":5
      }
   },
   "rankings":{
      "countryRegionDiff":{
         "value":0,
         "rank":40,
         "tier":"gold"
      },
      "countryDamages":{
         "value":40994821,
         "rank":50,
         "tier":"gold"
      },
      "weeklyCountryDamages":{
         "value":6019493,
         "rank":42,
         "tier":"gold"
      },
      "weeklyCountryDamagesPerCitizen":{
         "value":25186.16317991632,
         "rank":66,
         "tier":"bronze"
      },
      "countryDevelopment":{
         "value":116.97,
         "rank":12,
         "tier":"platinum"
      },
      "countryActivePopulation":{
         "value":239,
         "rank":4,
         "tier":"diamond"
      },
      "countryWealth":{
         "value":4241.895064999963,
         "rank":16,
         "tier":"platinum"
      },
      "countryBounty":{
         "value":3670.1995245949006,
         "rank":55,
         "tier":"gold"
      },
      "countryProductionBonus":{
         "value":5,
         "rank":35,
         "tier":"platinum"
      }
   },
   "currentBattleOrder":"686cf60ab39f079a4a5b92a9",
   "updatedAt":"2026-02-14T05:30:03.259Z",
   "development":116.94287231520703,
   "discordUrl":"https://discord.gg/9tsG4z2SVH",
   "specializedItem":"cookedFish",
   "rulingParty":"698cfa6003daee7f6b14aab9",
   "pinnedArticle":"6980cd05774ea140dceccbfb"
} */

export const Country = props => {

    return (
        <>
            <h1>Hello Country</h1>
            <SimpleStats {...props} />
        </>
    )

}

export default Country