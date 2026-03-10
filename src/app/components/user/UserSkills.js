import React from "react"
import { useSelector } from "react-redux"
import ListGroup from "react-bootstrap/ListGroup"
import UserSkillAttack from "./UserSkillAttack"
import UserSkillRegen from "./UserSkillRegen"
import UserSkillDefault from "./UserSkillDefault"
import UserEquipment from "./UserEquipment"
import "./UserSkills.css"



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

    //const { lootChance, companies, management, ...equipmentSkills } = otherProps

    const { config } = useSelector(state => state.app)

    const otherItems = Object.keys(otherProps).map((key, i) => {
        const someProps = Object.assign({}, { skill: otherProps[key] }, { config: config })
        return (
            <ListGroup.Item key={i}>
                <UserSkillDefault skillName={key} {...someProps} />
            </ListGroup.Item>
        )
    })

    const energyProps = Object.assign({}, { skill: energy }, { config: config })
    const healthProps = Object.assign({}, { skill: health }, { config: config })
    const hungerProps = Object.assign({}, { skill: hunger }, { config: config })
    const entrepreneurshipProps = Object.assign({}, { skill: entrepreneurship }, { config: config })
    const productionProps = Object.assign({}, { skill: production }, { config: config })

    return (
        <>
            {/* {equipmentSkills && <UserEquipment {...equipmentSkills} />} */}
            <ListGroup className="user-skills">
                <ListGroup.Item></ListGroup.Item>
                {/* <ListGroup.Item><UserSkillAttack {...attack} /></ListGroup.Item> */}
                <ListGroup.Item><UserSkillRegen skillName="Energy" {...energyProps} /></ListGroup.Item>
                <ListGroup.Item><UserSkillRegen skillName="Health" {...healthProps} /></ListGroup.Item>
                <ListGroup.Item><UserSkillRegen skillName="Hunger" {...hungerProps} /></ListGroup.Item>
                <ListGroup.Item><UserSkillRegen skillName="Entrepreneurship" {...entrepreneurshipProps} /></ListGroup.Item>
                <ListGroup.Item><UserSkillRegen skillName="Production" {...productionProps} /></ListGroup.Item>
                {otherItems}
            </ListGroup>
        </>
    )
}

export default UserSkills