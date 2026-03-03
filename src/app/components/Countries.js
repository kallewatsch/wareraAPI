import React, { useState } from "react"
import { useSelector } from 'react-redux'
import Row from "react-bootstrap/Row"
import SortableTable from "./util/SortableTable"


export const Countries = () => {

    const { countries } = useSelector(state => state.app)
    //const [thMode, setThMode] = useState('realtime')

    // [...countries].map() to assign some wicked values. See intel/Intel
    const extendedCountries = [...countries]

    const ths = [
        { txt: "Name", attrPath: "", target: "name" },
        { txt: "Region Diff", attrPath: ["rankings", "countryRegionDiff"], target: "value" },
        { txt: "Damages", attrPath: ["rankings", "countryDamages"], target: "value" },
        { txt: "Weekly Damages", attrPath: ["rankings", "weeklyCountryDamages"], target: "value" },
        { txt: "Damage per Citizen", attrPath: ["rankings", "weeklyCountryDamagesPerCitizen"], target: "value" },
        { txt: "Development (rankings)", attrPath: ["rankings", "countryDevelopment"], target: "value" },
        { txt: "Active Population", attrPath: ["rankings", "countryActivePopulation"], target: "value" },
        { txt: "Wealth", attrPath: ["rankings", "countryWealth"], target: "value" },
        { txt: "Bounty", attrPath: ["rankings", "countryBounty"], target: "value" },
        { txt: "Production Bonus", attrPath: ["rankings", "countryProductionBonus"], target: "value" },
        { txt: "Development", attrPath: "", target: "development" },
        { txt: "Specialized Item", attrPath: "", target: "specializedItem" },
    ]

    return <>
        {countries?.length && <Row>
            {/* <Button onClick={handleSetThMode}>toggle mode</Button> */}
            <h5>Countries{/* : | current mode: <Badge bg={thMode} txt={thMode}>{thMode}</Badge> */}</h5>
            <SortableTable items={[...extendedCountries]} ths={[...ths]} component="country" /* key={`${thMode}`} */ />
        </Row>}
    </>
}

export default Countries