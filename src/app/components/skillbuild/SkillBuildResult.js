import React from "react"
import { getCanAttackTimesFood, getExpectedAttackCost, getExpectedDamage } from "../../utils/fooStuff"
import { useSelector } from "react-redux"
import { ListGroup, ListGroupItem } from "react-bootstrap"
import IconWithPopoverOverlay from "../util/IconWithPopoverOverlay"
import {
    GiBroadsword,
    GiBulletImpacts,
    GiCharacter,
    GiCrosshair,
    GiDeadlyStrike,
    GiHeadshot,
    GiHearts,
    GiHelmetHeadShot,
    GiMachineGunMagazine,
    GiMedicalDrip,
    GiRunningNinja,
    GiShield,
    GiShinyApple,
    GiSpellBook,
} from "react-icons/gi"
import { IconContext } from "react-icons"

export const SkillBuildResult = (props) => {

    const { skills, equipment, food } = useSelector(state => state.app.skillbuild)

    const { weapon, gloves, helmet, chest, pants, boots } = equipment

    const health = 50 + (skills.health * 10)
    const hunger = 4 + skills.hunger
    const attack = 100 + (skills.attack * 20) + weapon.values.attack
    const precision = 50 + (skills.precision * 5) + gloves.values.precision
    const criticalChance = 10 + (skills.criticalChance * 5) + weapon.values.criticalChance
    const criticalDamages = 100 + (skills.criticalDamages * 20) + helmet.values.criticalDamages
    const armor = (skills.armor * 4) + chest.values.armor + pants.values.armor
    const dodge = (skills.dodge * 4) + boots.values.dodge

    const _skills = {
        attack: { total: attack },
        precision: { total: precision },
        criticalChance: { total: criticalChance },
        criticalDamages: { total: criticalDamages },
        armor: { total: armor },
        dodge: { total: dodge }
    }

    const expDmg = getExpectedDamage(_skills)
    const expCost = getExpectedAttackCost(_skills)

    let foodValue
    let foodIconClassName

    switch (food) {
        case "fish":
            foodValue = 30
            foodIconClassName = "icon-epic"
            break
        case "steak":
            foodValue = 20
            foodIconClassName = "icon-blue"
            break
        case "bread":
            foodValue = 10
            foodIconClassName = "icon-green"
            break
        default:
            foodIconClassName = "icon-gray"
            foodValue = 0

    }

    const canAttackTimesFood = getCanAttackTimesFood(
        { health: { currentBarValue: health }, hunger: { currentBarValue: hunger }, armor: { total: armor }, dodge: { total: dodge } },
        true,
        foodValue
    )
    const dmgFood = expDmg * canAttackTimesFood

    const totalSkillPoints = Object.keys(skills).map((key, i) => {
        const skill = skills[key]
        const skillpoints = skill ? Array.apply(null, Array(skill)).map((_, i) => i + 1).reduce((acc, curr) => acc + curr, 0) : 0
        return skillpoints
    }).reduce((acc, curr) => acc + curr, 0)

    const requiredLevel = Math.ceil(totalSkillPoints / 4)


    const listGroupItems1 = [
        ["Attack", attack, <GiBroadsword />],
        ["Health", health, <GiHearts />],
        ["Hunger", hunger, <GiShinyApple />],
        ["Precision", precision, <GiCrosshair />],
        ["Critical Chance", criticalChance, <GiHeadshot />],
        ["Critical Damage", criticalDamages, <GiHelmetHeadShot />],
        ["Armor", armor, <GiShield />],
        ["Dodge", dodge, <GiRunningNinja />]
    ].map((x, i) => {
        const [title, value, icon] = x
        return (
            <ListGroupItem key={i}>
                <IconWithPopoverOverlay title={title}><span>{icon} {value}</span></IconWithPopoverOverlay>
            </ListGroupItem>
        )
    })

    const listGroupItems2 = [
        ["Required Level", requiredLevel, <GiCharacter />],
        ["Total Skill Points", totalSkillPoints, <GiSpellBook />],
        ["Expected Damage Per Attack", expDmg.toFixed(2), <GiBulletImpacts />],
        ["Expected Health Cost Per Attack", expCost.toFixed(2), <GiMedicalDrip />],
        ["Can Attack Times No Food", canAttackTimesFood, <GiMachineGunMagazine className={foodIconClassName} />],
        ["Expected Damage No Food", dmgFood.toFixed(2), <GiDeadlyStrike className={foodIconClassName} />],
    ].map((x, i) => {
        const [title, value, icon] = x
        return (
            <ListGroupItem key={i}>
                <IconWithPopoverOverlay title={title}><span>{icon} {value}</span></IconWithPopoverOverlay>
            </ListGroupItem>
        )
    })

    return (
        <IconContext.Provider value={{ size: "2em" }}>
            <ListGroup horizontal className="skill-list">
                {listGroupItems1}
            </ListGroup>
            <ListGroup horizontal className="skill-list">
                {listGroupItems2}
            </ListGroup>
        </IconContext.Provider>
    )

}


export default SkillBuildResult