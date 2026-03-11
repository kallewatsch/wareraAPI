import React, { useState } from "react"
import { useSelector } from 'react-redux'
import Row from "react-bootstrap/Row"
import { GiAxeSword, GiPeaceDove, GiShield } from "react-icons/gi";
import SortableTableWithTabs from "./util/SortableTableWithTabs"
import { extendCountries } from "../utils/countryStuff"
import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Tooltip } from "react-bootstrap";


export const IconWithOverlay = ({ id, children, title, text }) => {

    const renderTooltip = (props, title, text = "Lorem Ipsum") => (
        <Popover {...props}>
            <PopoverHeader>{title}</PopoverHeader>
            <PopoverBody>{text}</PopoverBody>
        </Popover>
    )
    return (
        <OverlayTrigger overlay={(_props) => renderTooltip(_props, title)}>
            {children}
        </OverlayTrigger >
    )
}

export const Countries = () => {

    const { countries, users, regions, upgrades, isLoading } = useSelector(state => state.app)

    const extendedCountries = extendCountries(countries, users, regions, upgrades)

    const thsUpgrades = [
        ["bunkers", GiShield],
        ["bases", GiAxeSword],
        ["pacificationCenters", GiPeaceDove]
    ].map(x => {
        return ["total", "active", "pending", "disabled"].map(status => {
            const title = `${x[0]} ${status}`
            const FooIcon = x[1]
            const txt = title
            const icon = <IconWithOverlay title={title}><FooIcon size="3em" className={`icon-${status}`} /></IconWithOverlay>
            return { icon, txt, attrPath: ["extended", x[0]], target: status }
        })
    }).flat()

    //console.log(thsUpgrades)

    /* const thsBunkers = [
        { txt: "Name", attrPath: "", target: "name" },
        { txt: <OverlayTrigger overlay={<Tooltip id="meh">lalal</Tooltip>}><GiShield size="2em" /></OverlayTrigger>, attrPath: ["extended", "bunkers"], target: "total" },
        { txt: <IconWithOverlay title="Pending Bunkers" ><GiShield size="2em" className="icon-gold" /></IconWithOverlay>, attrPath: ["extended", "bunkers"], target: "pending" },
        { txt: <IconWithOverlay title="Pending Bunkers" ><span><GiShield size="2em" className="icon-green" />xxx</span></IconWithOverlay>, attrPath: ["extended", "bunkers"], target: "active" },
        { txt: <GiShield size="2em" className="icon-red" />, attrPath: ["extended", "bunkers"], target: "disabled" },
    ]

    const thsBases = [
        { txt: "Name", attrPath: "", target: "name" },
        { txt: "Total Military Bases", attrPath: ["extended", "bases"], target: "total" },
        { txt: "Pending Military Bases", attrPath: ["extended", "bases"], target: "pending" },
        { txt: "Active Military Bases", attrPath: ["extended", "bases"], target: "active" },
        { txt: "Disabled Military Bases", attrPath: ["extended", "bases"], target: "disabled" },
    ]

    const thsPacificationCenters = [
        { txt: "Name", attrPath: "", target: "name" },
        { txt: "Total Pacification Centers", attrPath: ["extended", "pacificationCenters"], target: "total" },
        { txt: "Pending Pacification Centers", attrPath: ["extended", "pacificationCenters"], target: "pending" },
        { txt: "Active Pacification Centers", attrPath: ["extended", "pacificationCenters"], target: "active" },
        { txt: "Disabled Pacification Centers", attrPath: ["extended", "pacificationCenters"], target: "disabled" },
    ] */

    const thsBla = [
        { txt: "Name", attrPath: "", target: "name" },
        { txt: "Available Damage (No Food)", attrPath: ["extended"], target: "totalAvailableCountryDmg" },
    ]

    const thsFoo = [
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

    const thName = { txt: "Name", attrPath: "", target: "name" }

    const tabs = [
        { name: "Upgrades", ths: [thName, ...thsUpgrades] },
        /* { name: "Bunkers", ths: thsBunkers },
        { name: "Military Bases", ths: thsBases },
        { name: "Pacification Centers", ths: thsPacificationCenters }, */
        { name: "Bla", ths: thsBla },
        { name: "Foo", ths: thsFoo },
    ]

    return <>
        {!isLoading && countries?.length && <Row>
            <h5>Countries</h5>
            <SortableTableWithTabs items={[...extendedCountries]} tabs={tabs} component="country" /* key={`${thMode}`} */ />
        </Row>}
    </>
}

export default Countries