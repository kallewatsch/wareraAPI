import { GiAxeSword, GiCharacter, GiPeaceDove, GiShield } from "react-icons/gi"
import { createIconWithOverlayTh } from "./util/table/thCreators"

const thsFoo = [
    { icon: { component: GiCharacter }, title: "Country Name", txt: "Name", attrPath: "", target: "name" },
    { icon: { component: GiCharacter }, title: "Country Region Diff", txt: "Region Diff", attrPath: ["rankings", "countryRegionDiff"], target: "value" },
    { icon: { component: GiCharacter }, title: "Country Damages", txt: "Damages", attrPath: ["rankings", "countryDamages"], target: "value" },
    { icon: { component: GiCharacter }, title: "Country Weekly Damages", txt: "Weekly Damages", attrPath: ["rankings", "weeklyCountryDamages"], target: "value" },
    { icon: { component: GiCharacter }, title: "Country Damage per Citizen", txt: "Damage per Citizen", attrPath: ["rankings", "weeklyCountryDamagesPerCitizen"], target: "value" },
    { icon: { component: GiCharacter }, title: "Country Development", txt: "Development (rankings)", attrPath: ["rankings", "countryDevelopment"], target: "value" },
    { icon: { component: GiCharacter }, title: "Country Active Population", txt: "Active Population", attrPath: ["rankings", "countryActivePopulation"], target: "value" },
    { icon: { component: GiCharacter }, title: "Country Wealth", txt: "Wealth", attrPath: ["rankings", "countryWealth"], target: "value" },
    { icon: { component: GiCharacter }, title: "Country Bounty", txt: "Bounty", attrPath: ["rankings", "countryBounty"], target: "value" },
    { icon: { component: GiCharacter }, title: "Country Production Bonus", txt: "Production Bonus", attrPath: ["rankings", "countryProductionBonus"], target: "value" },
    { icon: { component: GiCharacter }, title: "Country Development", txt: "Development", attrPath: "", target: "development" },
    { icon: { component: GiCharacter }, title: "Country Specialized Item", txt: "Specialized Item", attrPath: "", target: "specializedItem" },
]

const thsBla = [
    { icon: { component: GiCharacter }, title: "Country Name", txt: "Name", attrPath: "", target: "name" },
    { icon: { component: GiCharacter }, title: "Country Total Available Damage", txt: "Available Damage (No Food)", attrPath: ["extended"], target: "totalAvailableCountryDmg" },
]

const thsUpgrades = [
    ["bunkers", GiShield, "Country Bunkers"],
    ["bases", GiAxeSword, "Country Bases"],
    ["pacificationCenters", GiPeaceDove, "Country Pacification Centers"]
].map(x => {
    return ["total", "active", "pending", "disabled"].map(status => {
        return { icon: { component: x[1], className: `icon-${status}` }, title: `${x[2]} ${status}`, txt: x[2], attrPath: ["extended", x[0]], target: status }
    })
}).flat()

export const countriesTabs = [
    { name: "Country Region Upgrades", ths: [...thsUpgrades.map(th => createIconWithOverlayTh(th))] },
    { name: "Basic", ths: [...thsFoo.map(th => createIconWithOverlayTh(th))] },
    { name: "Extended", ths: [...thsBla.map(th => createIconWithOverlayTh(th))] }
]