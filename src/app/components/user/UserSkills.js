import React from "react"
import ListGroup from "react-bootstrap/ListGroup"
import SimpleStats from "../SimpleStats"
import UserSkillAttack from "./UserSkillAttack"
import UserSkillRegen from "./UserSkillRegen"
import UserSkillDefault from "./UserSkillDefault"



export const UserSkills = props => {
    const {
        attack,
        energy,
        health,
        hunger,
        entrepreneurship,
        production,
        ...otherProps
    } = props

    const otherItems = Object.keys(otherProps).map((key, i) => {
        return (
            <ListGroup.Item key={i}>
                <UserSkillDefault skillName={key} {...otherProps[key]} />
            </ListGroup.Item>
        )
    })

    return (
        <ListGroup>
            <ListGroup.Item><UserSkillAttack {...attack} /></ListGroup.Item>
            <ListGroup.Item><UserSkillRegen skillName="Energy" {...energy} /></ListGroup.Item>
            <ListGroup.Item><UserSkillRegen skillName="Health" {...health} /></ListGroup.Item>
            <ListGroup.Item><UserSkillRegen skillName="Hunger" {...hunger} /></ListGroup.Item>
            <ListGroup.Item><UserSkillRegen skillName="Entrepreneurship" {...entrepreneurship} /></ListGroup.Item>
            <ListGroup.Item><UserSkillRegen skillName="Production" {...production} /></ListGroup.Item>
            {otherItems}
        </ListGroup>
    )
}

export default UserSkills