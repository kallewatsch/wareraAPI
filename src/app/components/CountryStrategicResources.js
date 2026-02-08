import React from "react"
import SimpleStats from "./SimpleStats"

/* 

{
  "resources": {
    "rareEarths": [
      "6813b7079403bc4170a5d8ca"
    ]
  },
  "bonuses": {
    "productionPercent": 5,
    "developmentPercent": 5
  }
}

*/

export const CountryStrategicResources = props => {
    const {resources, bonuses} = props

    return (
        <>
            <h1>Hello CountryStrategicResources</h1>
            <SimpleStats {...props} />
        </>
        
    )

}

export default CountryStrategicResources