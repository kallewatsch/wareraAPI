import React from "react"
import SimpleStats from "../SimpleStats"


export const UserSkillAttack = (props) => {

    /* const {
        level,
        ammoPercent,
        buffsPercent,
        debuffsPercent,
        militaryRankPercent,
        value,
        weapon,
        equipment,
        limited,
        total
    } = props */
    const { total, ...otherProps } = props

    return <>
        Attack: {total}
        {/* <SimpleStats {...otherProps} /> */}
    </>

}


export default UserSkillAttack