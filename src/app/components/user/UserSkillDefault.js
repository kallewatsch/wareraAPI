import React from "react"
import ProgressBar from "react-bootstrap/ProgressBar"


export const UserSkillDefault = (props) => {

    const { skillName, config, skill, ...otherProps } = props

    const key = skillName.toLowerCase()
    const fuck = config?.skills?.[skillName]

    const maxVal = skill.total
    const indexKey = Object.keys(fuck || {}).at(-1)
    const fuckVal = fuck?.[indexKey]?.value
    const label = `${skill.value}/${maxVal}`

    return <>
        {skillName}:
        <ProgressBar>
            <ProgressBar max={fuckVal} now={skill.value} label={label} key={1} />
            <ProgressBar max={fuckVal} now={fuckVal} key={2} variant="danger" striped />
        </ProgressBar>
    </>

}


export default UserSkillDefault