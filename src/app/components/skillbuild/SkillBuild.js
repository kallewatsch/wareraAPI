import React, { useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import BattleSkills from "./BattleSkills"
import Equipment from "./Equipment"
import { useDispatch, useSelector } from "react-redux"
import SkillBuildResult from "./SkillBuildResult"
import Food from "./Food"
import { getCanAttackTimesFood, getExpectedAttackCost, getExpectedDamage } from "../../utils/fooStuff"
import { resetAll, setHasBest, setSkills } from "../../slices/skillbuildSlice"
import { setIsLoading } from "../../slices/loadingSlice"
import { Button, FormControl, InputGroup } from "react-bootstrap"

// TODO: in order: no equpiment option; add ammo bonus to dmg; add military rank bonus to dmg;
export const getFoodVal = food => {
    switch (food) {
        case "fish":
            return 20
        case "steak":
            return 15
        case "bread":
            return 10
        default:
            return 0
    }
}

export const getRequiredUpgradeSkillPoints = ({ skillLevel }) => {
    return Array.apply(null, Array(skillLevel))
        .map((_, i) => i + 1)
        .reduce((acc, curr) => acc + curr, 0)
}

export const getSum = (arr) => {
    return arr.reduce((acc, curr) => acc + curr, 0)
}

export const foo = () => {

}

export const getBestSkillBuild = ({ playerLevel, criteria, food, equipment }) => {
    const startedAt = Date.now()
    const skillCount = 8
    const totalSkillPoints = playerLevel * 4
    const choices = Array.apply(null, Array(11)).map((_, i) => getRequiredUpgradeSkillPoints({ skillLevel: i }))
    //console.log(choices, choices.at(-1))
    let candidates = [[]]
    // TODO: this crashes if player level above 30, maybe because the list exceeds its max size => use multiple lists
    for (let i = 0; i < skillCount; i++) {
        let newCandidates = []
        for (let baseArr of candidates) {
            for (const choice of choices) {
                const cost = getSum(baseArr) + choice
                const cond1 = cost <= totalSkillPoints
                const cond2 = i == skillCount - 1 || totalSkillPoints - cost <= ((skillCount - (i + 1)) * choices.at(-1))
                if (cond1 && cond2) {
                    newCandidates.push([...baseArr, choice])
                } else {
                    break;
                }
            }
        }
        candidates = newCandidates.filter(x => x.length == i + 1)
    }
    //console.log({ candidates })
    let maxDmg = 0
    let bestCandidate
    for (let candidate of candidates) {
        const [
            health,
            hunger,
            armor,
            dodge,
            precision,
            criticalChance,
            attack,
            criticalDamages
        ] = candidate.map(x => choices.indexOf(x))


        const equipmentVal = {
            health: 0,
            hunger: 0,
            armor: equipment.chest.values.armor + equipment.pants.values.armor,
            dodge: equipment.boots.values.dodge,
            precision: equipment.gloves.values.precision,
            criticalChance: equipment.weapon.values.criticalChance,
            attack: equipment.weapon.values.attack,
            criticalDamages: equipment.helmet.values.criticalDamages
        }

        const healthVal = 100 + (health * 10)
        const hungerVal = 4 + hunger
        const armorVal = 6 * armor
        const dodgeVal = 4 * dodge
        const precisionVal = 50 + (5 * precision)
        const criticalChanceVal = 10 + (5 * criticalChance)
        const attackVal = 100 + (25 * attack)
        const criticalDamagesVal = 100 + (20 * criticalDamages)

        const healthTotal = healthVal + equipmentVal.health
        const hungerTotal = hungerVal + equipmentVal.hunger
        const armorTotal = armorVal + equipmentVal.armor
        const dodgeTotal = dodgeVal + equipmentVal.dodge
        const precisionTotal = precisionVal + equipmentVal.precision
        const criticalChanceTotal = criticalChanceVal + equipmentVal.criticalChance
        const attackTotal = attackVal + equipmentVal.attack
        const criticalDamagesTotal = criticalDamagesVal + equipmentVal.criticalDamages

        //console.log(healthTotal, hungerTotal, armorTotal, dodgeTotal, precisionTotal, criticalChanceTotal, attackTotal, criticalDamagesTotal)

        const skills = {
            health: { value: healthVal, currentBarValue: healthVal, total: healthTotal },
            hunger: { value: hungerVal, currentBarValue: hungerVal, total: hungerTotal },
            armor: { value: armorVal, total: armorTotal },
            dodge: { value: dodgeVal, total: dodgeTotal },
            precision: { value: precisionVal, total: precisionTotal },
            criticalChance: { value: criticalChanceVal, total: criticalChanceTotal },
            attack: { value: attackVal, total: attackTotal },
            criticalDamages: { value: criticalDamagesVal, total: criticalDamagesTotal }
        }
        const expDmg = getExpectedDamage(skills, true)
        //const expCost = getExpectedAttackCost(skills, false)
        const canAttackTimes = getCanAttackTimesFood(skills, true, food)
        //console.log(expDmg, canAttackTimes)
        const totalDmg = canAttackTimes * expDmg
        if (totalDmg > maxDmg) {
            maxDmg = totalDmg
            bestCandidate = candidate
        }
    }
    const bla = bestCandidate.map(x => choices.indexOf(x))
    const entries = ["health", "hunger", "armor", "dodge", "precision", "criticalChance", "attack", "criticalDamages"].map((x, i) => {
        return [x, bla[i]]
    })
    const finishedAt = Date.now()
    const timeDeltaSeconds = (finishedAt - startedAt) / 1000
    console.log("finished after ", timeDeltaSeconds)
    return Object.fromEntries(entries)
}

export const SkillBuild = (props) => {

    const { /* skills, */ equipment, food, hasBest } = useSelector(state => state.app.skillbuild)
    const [playerLevel, setPlayerLevel] = useState(10)

    const dispatch = useDispatch()

    const handleClick = (event) => {
        dispatch(setIsLoading(true))
        try {

            const foodVal = getFoodVal(food)
            setTimeout(() => {
                const best = getBestSkillBuild({ playerLevel, criteria: undefined, food: foodVal, equipment })
                dispatch(setSkills(best))
                dispatch(setHasBest(true))
                dispatch(setIsLoading(false))
                //setHasBest(true)
            }, 100)
        } catch (err) {
            console.log(err)
            dispatch(setIsLoading(false))
        }
    }

    const handleChange = event => {
        const _value = event?.target?.value || 0
        const val = parseInt(_value)
        const value = val <= 95 ? val : 95
        setPlayerLevel(value)
    }

    const handleReset = event => {
        dispatch(resetAll())
    }

    return (
        <>

            {!hasBest
                ? (<Row>
                    <Col>
                        <Button onClick={handleClick}>Get Best Build</Button>
                        <InputGroup>
                            <InputGroup.Text>Set Player Level (current: {playerLevel})</InputGroup.Text>
                            <FormControl onChange={handleChange} value={playerLevel} />
                            <InputGroup.Text>Set Food (current: {food})</InputGroup.Text>
                            <Food />
                        </InputGroup>
                        <Equipment />

                        {/* <Food /> */}

                    </Col>
                </Row>)
                : (<><Row>
                    <Col >
                        <Button onClick={handleReset}>Reset</Button>
                        <SkillBuildResult />
                    </Col>
                </Row>
                    <Row>
                        <Col>
                            <BattleSkills />
                        </Col>
                        <Col >
                            <Equipment />
                        </Col>
                    </Row></>)}
        </>
    )
}


export default SkillBuild