import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { addUsers } from "../slices/usersSlice"
import Row from "react-bootstrap/Row"
import { GiAxeSword, GiPeaceDove, GiShield } from "react-icons/gi"
import SortableTableWithTabs from "./util/table/SortableTableWithTabs"
import { extendCountries } from "../utils/countryStuff"
import { countriesTabs } from "./countriesTableheaders"
import { CHUNKSIZES } from "../config"


export const Countries = () => {

    const { countries, users, userIds, regions, upgrades, loading } = useSelector(state => state.app)

    const dispatch = useDispatch()

    const extendedCountries = extendCountries(countries, users, regions, upgrades)

    const tabs = countriesTabs

    useEffect(() => {
        if (!userIds) return;
        const worldUserIds = userIds.map(x => x.userId)
        const exisintUserIds = users?.map(user => user._id) || []
        const missingUserIds = worldUserIds.filter(id => !exisintUserIds.includes(id))
        const chunksize = CHUNKSIZES.getUserLite
        if (missingUserIds.length) {
            dispatch(addUsers({ userIds: missingUserIds, chunksize }))
        }
    }, [userIds.length])


    // TODO: handle sortabletable rendering differently. (outdated data atm, because effect. useState vs rtk (rtk prob better, but harder))
    return <>
        {!loading.isLoading && countries?.length && <Row>
            <h5>Countries</h5>
            <SortableTableWithTabs items={[...extendedCountries]} tabs={tabs} component="country" /* key={`${thMode}`} */ />
        </Row>}
    </>
}

export default Countries