import {
    GiAppleCore,
    GiBattery50,
    GiBatteryPack,
    GiBroadsword,
    GiBulletImpacts,
    GiCardboardBoxClosed,
    GiCharacter,
    GiChewedHeart,
    GiClawHammer,
    GiConvict,
    GiCrosshair,
    GiDeadlyStrike,
    GiFactory,
    GiHeadshot,
    GiHearts,
    GiHelmetHeadShot,
    GiLightBulb,
    GiMachineGunMagazine,
    GiMedicalDrip,
    GiRunningNinja,
    GiShield,
    GiShinyApple,
    GiSlaveryWhip,
    GiStarMedal
} from "react-icons/gi"
import { createIconWithOverlayTh } from "../util/table/thCreators"

const thsWar = [
    { icon: { component: GiCharacter }, title: "User Name", txt: 'username', attrPath: [], target: "username" },
    { icon: { component: GiBroadsword }, title: "Attack Total", txt: 'attack total', attrPath: ['skills', 'attack'], target: 'total' },
    { icon: { component: GiHearts }, txt: 'health', title: "Health", attrPath: ['skills', 'health'], target: 'total' },
    { icon: { component: GiChewedHeart, className: "icon-active" }, title: "Current Health", txt: 'health now', attrPath: ['skills', 'health'], target: 'currentBarValue' },
    { icon: { component: GiShinyApple }, title: "Hunger", txt: 'hunger', attrPath: ['skills', 'hunger'], target: 'total' },
    { icon: { component: GiAppleCore, className: "icon-active" }, title: "Current Hunger", txt: 'hunger now', attrPath: ['skills', 'hunger'], target: 'currentBarValue' },
    { icon: { component: GiHeadshot }, title: "Critical Hit Chance", txt: 'crit chance', attrPath: ['skills', 'criticalChance'], target: 'total' },
    { icon: { component: GiHelmetHeadShot }, title: "Critical Damage", txt: 'crit dmg', attrPath: ['skills', 'criticalDamages'], target: 'total' },
    { icon: { component: GiShield }, title: "Armor", txt: 'armor', attrPath: ['skills', 'armor'], target: 'total' },
    { icon: { component: GiCrosshair }, title: "Precision", txt: 'precision', attrPath: ['skills', 'precision'], target: 'total' },
    { icon: { component: GiRunningNinja }, title: "Dodge", txt: 'dodge', attrPath: ['skills', 'dodge'], target: 'total' },
    { icon: { component: GiCardboardBoxClosed }, title: "Loot Chance", txt: 'lootChance', attrPath: ['skills', 'lootChance'], target: 'total' },
]

const thsEco = [
    { icon: { component: GiCharacter }, title: "User Name", txt: 'username', attrPath: [], target: "username" },
    { icon: { component: GiBatteryPack }, title: "User Energy", txt: 'energy', attrPath: ['skills', 'energy'], target: 'total' },
    { icon: { component: GiBattery50, className: "icon-active" }, title: "User Current Energy", txt: 'energy now', attrPath: ['skills', 'energy'], target: 'currentBarValue' },
    { icon: { component: GiLightBulb }, title: "User Entrepreneurship", txt: 'entrepreneurship', attrPath: ['skills', 'entrepreneurship'], target: 'total' },
    { icon: { component: GiLightBulb, className: "icon-active" }, title: "User Current Entrepreneurship", txt: 'entrepreneurship now', attrPath: ['skills', 'entrepreneurship'], target: 'currentBarValue' },
    { icon: { component: GiClawHammer }, title: "User Production", txt: 'production', attrPath: ['skills', 'production'], target: 'total' },
    { icon: { component: GiFactory }, title: "User Companies", txt: 'companies', attrPath: ['skills', 'companies'], target: 'total' },
    { icon: { component: GiSlaveryWhip }, title: "User Managment", txt: 'management', attrPath: ['skills', 'management'], target: 'total' }
]

const thsExtended = [
    { icon: { component: GiCharacter }, title: "User Name", txt: 'username', attrPath: [], target: "username" },
    { icon: { component: GiBulletImpacts }, title: "User Expected Damage", txt: 'the average damage per attack', attrPath: ["extended"], target: "expDmg" },
    { icon: { component: GiMedicalDrip }, title: "User Expected Health Cost", txt: 'the average health cost per attack', attrPath: ["extended"], target: "expAttCost" },
    {
        icon: { component: GiMachineGunMagazine }, title: "User Can Attack Times", txt: 'the expected amount of attacks a user can perform',
        attrPath: ["extended", "foods", "noFood"], target: "canAttackTimes"
    },
    {
        icon: { component: GiDeadlyStrike }, title: "User Available Damage", txt: 'the amount of damage user can do (food not included)',
        attrPath: ["extended", "foods", "noFood"], target: "availableDmg"
    },
    {
        icon: { component: GiMachineGunMagazine, className: "icon-epic" }, title: "Food Fish", txt: 'the expected amount of attacks a user can perform',
        attrPath: ["extended", "foods", "fish"], target: "canAttackTimes"
    },
    {
        icon: { component: GiDeadlyStrike, className: "icon-epic" }, title: "Food Fish", txt: 'the amount of damage user can do (food fish)',
        attrPath: ["extended", "foods", "fish"], target: "availableDmg"
    }
]

const thsMisc = [
    { icon: { component: GiCharacter }, title: "User Name", txt: 'username', attrPath: [], target: "username" },
    { icon: { component: GiConvict }, title: "Banned User", txt: 'ban', attrPath: ['infos'], target: 'isBanned' },
    /* { icon: { component: GiCharacter }, title: "User Level", txt: 'level', attrPath: ["leveling"], target: "level" },
    { icon: { component: GiStarMedal }, title: "User Total XP", txt: 'xp', attrPath: ["leveling"], target: "totalXp" }, */
    { icon: { component: GiStarMedal }, title: "User Military Rank", txt: 'militaryRank', attrPath: [], target: "militaryRank" },
]

export const intelTabs = [
    { name: "Fighting", ths: [...thsWar.map(th => createIconWithOverlayTh(th))] },
    { name: "Economy", ths: [...thsEco.map(th => createIconWithOverlayTh(th))] },
    { name: "Extended Stuff", ths: [...thsExtended.map(th => createIconWithOverlayTh(th))] },
    { name: "Misc", ths: [...thsMisc.map(th => createIconWithOverlayTh(th))] }
]