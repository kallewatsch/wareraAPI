import React from "react"
import ProgressBar from "react-bootstrap/ProgressBar"


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
    const fuck = config?.skills?.[key]

    const maxVal = skill.total
    const fuckVal = fuck?.[10]?.value
    const label = `${skill.currentBarValue.toFixed(1)}/${maxVal}`

    return <>
        {skillName}:
        <ProgressBar>
            <ProgressBar max={fuckVal} now={skill.currentBarValue} label={label} key={1} />
            <ProgressBar max={fuckVal} now={skill.total} label={label} key={2} variant="secondary" />
            <ProgressBar max={fuckVal} now={fuckVal} key={3} variant="danger" striped />
        </ProgressBar>
    </>

}


export default UserSkillRegen