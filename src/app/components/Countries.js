import React, { useState } from "react"
import { useSelector } from 'react-redux'
import Row from "react-bootstrap/Row"
import { GiAxeSword, GiPeaceDove, GiShield } from "react-icons/gi";
import SortableTableWithTabs from "./util/table/SortableTableWithTabs"
import { extendCountries } from "../utils/countryStuff"
import { countriesTabs } from "./countriesTableheaders";


export const Countries = () => {

    const { countries, users, regions, upgrades, isLoading } = useSelector(state => state.app)

    const extendedCountries = extendCountries(countries, users, regions, upgrades)

    const tabs = countriesTabs

    return <>
        {!isLoading && countries?.length && <Row>
            <h5>Countries</h5>
            <SortableTableWithTabs items={[...extendedCountries]} tabs={tabs} component="country" /* key={`${thMode}`} */ />
        </Row>}
    </>
}

export default Countries