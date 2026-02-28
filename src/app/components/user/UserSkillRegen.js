import React from "react"
import Progressbar from "react-bootstrap/Progressbar"


export const UserSkillRegen = (props) => {

    /* const {
        level,
        currentBarValue,
        value,
        weapon,
        equipment,
        limited,
        total,
        hourlyBarRegen
    } = props */
    const {
        skillName,
        config,
        skill,
        ...otherProps
    } = props

    const key = skillName.toLowerCase()
    const fuck = config.skills[key]

    const maxVal = skill.total
    const fuckVal = fuck[10]?.value
    const label = `${skill.currentBarValue.toFixed(1)}/${maxVal}`

    return <>
        {skillName}:
        <Progressbar>
            <Progressbar max={fuckVal} now={skill.currentBarValue} label={label} key={1} />
            <Progressbar max={fuckVal} now={skill.total} label={label} key={2} variant="secondary" />
            <Progressbar max={fuckVal} now={fuckVal} key={3} variant="danger" striped />
        </Progressbar>
    </>

}


export default UserSkillRegen