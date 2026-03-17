import React from "react"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import { GiBoxUnpacking, GiBroadsword, GiCrosshair, GiHeadshot, GiHearts, GiHelmetHeadShot, GiRunningNinja, GiShield, GiShinyApple } from "react-icons/gi"
import IconWithPopoverOverlay from "../util/IconWithPopoverOverlay"
import Skill from "./Skill"

export const BattleSkills = (props) => {

    const skills = [
        { name: "health", icon: GiHearts },
        { name: "hunger", icon: GiShinyApple },
        { name: "armor", icon: GiShield },
        { name: "dodge", icon: GiRunningNinja },
        { name: "precision", icon: GiCrosshair },
        { name: "criticalChance", icon: GiHeadshot },
        { name: "attack", icon: GiBroadsword },
        { name: "criticalDamages", icon: GiHelmetHeadShot },
        /* { name: "lootChance", icon: GiBoxUnpacking }, */
    ]

    return (
        <ListGroup>
            {skills.map((skill, i) => {
                const { name, icon: Icon } = skill
                const icon = <IconWithPopoverOverlay title={name} /* text={txt} */><Icon size="2em" /></IconWithPopoverOverlay>
                return (
                    <ListGroupItem key={i}>
                        <Skill name={name} icon={icon} />
                    </ListGroupItem>
                )
            })}
        </ListGroup>
    )

}


export default BattleSkills