import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import BattleSkills from "./BattleSkills"
import Equipment from "./Equipment"
import { useSelector } from "react-redux"
import { getCanAttackTimesFood, getExpectedAttackCost, getExpectedDamage } from "../../utils/fooStuff"
import SimpleStats from "../SimpleStats"

export const SkillBuild = (props) => {

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
    const canAttackTimes = getCanAttackTimesFood({health: {currentBarValue: health}, hunger: {currentBarValue: hunger}}) //
    const availableDmg = canAttackTimes * expDmg

    const totalSkillPoints = Object.keys(skills).map((key, i) => {
        const skill = skills[key]
        const skillpoints = skill ? Array.apply(null, Array(skill)).map((_, i) => i + 1).reduce((acc, curr) => acc + curr, 0) : 0
        return skillpoints
    }).reduce((acc, curr) => acc + curr, 0)

    const simpleStatsProps = {
        expDmg, expCost, canAttackTimes, availableDmg
    }

    return (
        <>
            <Row>
                <Col>
                    Total Skillpoints {totalSkillPoints} / Required Level: {Math.ceil(totalSkillPoints / 4)}
                </Col>
            </Row>
            <Row>
                <Col>
                    <BattleSkills />
                </Col>
                <Col>
                    <Equipment />
                </Col>
            </Row>
            <Row>
                <Col>
                    <SimpleStats {...simpleStatsProps} />
                </Col>
            </Row>
        </>
    )
}


export default SkillBuild