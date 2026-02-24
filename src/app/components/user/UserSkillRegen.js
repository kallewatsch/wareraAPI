import React from "react"
import SimpleStats from "../SimpleStats"


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

    const { skillName, total, ...otherProps } = props

    return <>
        {skillName}: {total}
        {/* <SimpleStats {...otherProps} /> */}
    </>

}


export default UserSkillRegen