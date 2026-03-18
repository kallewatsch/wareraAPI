import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import BattleSkills from "./BattleSkills"
import Equipment from "./Equipment"
import { useSelector } from "react-redux"
import SkillBuildResult from "./SkillBuildResult"
import Food from "./Food"

export const SkillBuild = (props) => {

    const { skills, equipment, food } = useSelector(state => state.app.skillbuild)


    /* const simpleStatsProps = {
        data: {
            expDmg, expCost,
            canAttackTimes: {
                noFood: canAttackTimesNoFood,
                bread: canAttackTimesBreadFood,
                steak: canAttackTimesSteakFood,
                fish: canAttackTimesFishFood
            },
            availableDmg: {
                noFood: canAttackTimesNoFood * expDmg,
                bread: canAttackTimesBreadFood * expDmg,
                steak: canAttackTimesSteakFood * expDmg,
                fish: canAttackTimesFishFood * expDmg
            }
        }
    } */

    return (
        <>
            <Row>
                <Col>
                    <Food />
                    <SkillBuildResult />
                </Col>
            </Row>
            <Row>
                <Col >
                    <BattleSkills />
                </Col>
                <Col >
                    <Equipment />
                </Col>
            </Row>
        </>
    )
}


export default SkillBuild