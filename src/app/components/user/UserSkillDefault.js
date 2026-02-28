import React from "react"
import Progressbar from "react-bootstrap/Progressbar"


export const UserSkillDefault = (props) => {

    const { skillName, config, skill, ...otherProps } = props

    const key = skillName.toLowerCase()
    const fuck = config.skills[skillName]

    const maxVal = skill.total
    console.log(key, skillName, fuck)
    const indexKey = Object.keys(fuck).at(-1)
    const fuckVal = fuck[indexKey]?.value
    const label = `${skill.value}/${maxVal}`

    return <>
        {skillName}:
        <Progressbar>
            <Progressbar max={fuckVal} now={skill.value} label={label} key={1} />
            <Progressbar max={fuckVal} now={fuckVal} key={2} variant="danger" striped />
        </Progressbar>
    </>

}


export default UserSkillDefault