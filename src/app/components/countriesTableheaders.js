import {
    GiAqueduct,
    GiAxeSword,
    GiClawHammer,
    GiCoinsPile,
    GiDeadlyStrike,
    GiDeathStar,
    GiFlamethrowerSoldier,
    GiFlyingFlag,
    GiMountains,
    GiOpenTreasureChest,
    GiPeaceDove,
    GiShield,
    GiSpikyExplosion,
    GiStarFormation,
    GiTeamUpgrade
} from "react-icons/gi"
import { createIconWithOverlayTh } from "./util/table/thCreators"

const thCountryName = createIconWithOverlayTh({ icon: { component: GiFlyingFlag }, title: "Country Name", txt: "Name", attrPath: "", target: "name" })

const thsFoo = [
    { icon: { component: GiMountains }, title: "Country Region Diff", txt: "Region Diff", attrPath: ["rankings", "countryRegionDiff"], target: "value" },
    { icon: { component: GiDeathStar }, title: "Country Damages", txt: "Damages", attrPath: ["rankings", "countryDamages"], target: "value" },
    { icon: { component: GiSpikyExplosion }, title: "Country Weekly Damages", txt: "Weekly Damages", attrPath: ["rankings", "weeklyCountryDamages"], target: "value" },
    { icon: { component: GiFlamethrowerSoldier }, title: "Country Damage per Citizen", txt: "Damage per Citizen", attrPath: ["rankings", "weeklyCountryDamagesPerCitizen"], target: "value" },
    { icon: { component: GiAqueduct }, title: "Country Development", txt: "Development (rankings)", attrPath: ["rankings", "countryDevelopment"], target: "value" },
    { icon: { component: GiTeamUpgrade }, title: "Country Active Population", txt: "Active Population", attrPath: ["rankings", "countryActivePopulation"], target: "value" },
    { icon: { component: GiCoinsPile }, title: "Country Wealth", txt: "Wealth", attrPath: ["rankings", "countryWealth"], target: "value" },
    { icon: { component: GiOpenTreasureChest }, title: "Country Bounty", txt: "Bounty", attrPath: ["rankings", "countryBounty"], target: "value" },
    { icon: { component: GiClawHammer }, title: "Country Production Bonus", txt: "Production Bonus", attrPath: ["rankings", "countryProductionBonus"], target: "value" },
    { icon: { component: GiAqueduct }, title: "Country Development", txt: "Development", attrPath: "", target: "development" },
    { icon: { component: GiStarFormation }, title: "Country Specialized Item", txt: "Specialized Item", attrPath: "", target: "specializedItem" },
]

const thsBla = [
    { icon: { component: GiDeadlyStrike }, title: "Country Total Available Damage", txt: "Available Damage (No Food)", attrPath: ["extended"], target: "totalAvailableCountryDmg" },
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
    { name: "Country Region Upgrades", ths: [thCountryName, ...thsUpgrades.map(th => createIconWithOverlayTh(th))] },
    { name: "Basic", ths: [thCountryName, ...thsFoo.map(th => createIconWithOverlayTh(th))] },
    { name: "Extended", ths: [thCountryName, ...thsBla.map(th => createIconWithOverlayTh(th))] }
]