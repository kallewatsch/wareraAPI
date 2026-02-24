import React from "react"
import SimpleStats from "../SimpleStats"


export const UserSkillDefault = (props) => {

    const { skillName, total, ...otherProps } = props

    return <>
        {skillName}: {total}
        {/* <SimpleStats {...otherProps} /> */}
    </>

}


export default UserSkillDefault