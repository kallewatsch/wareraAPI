import React from "react"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import ProgressBar from "react-bootstrap/ProgressBar"


export const UserSkillDefault = (props) => {

    const {
        skillName,
        config,
        skill,
        ...otherProps
    } = props

    const skillLevels = config?.skills?.[skillName]?.levels || {}
    const maxVal = Object.keys(skillLevels).length - 1
    const label = `${skill?.level}/${maxVal}`
    const now = skill?.level

    return <ListGroup horizontal>
        <ListGroupItem style={{ width: "20%", heigth: "250px" }}>{skillName}:</ListGroupItem>
        <ListGroupItem style={{ width: "80%", heigth: "250px" }}><ProgressBar>
            <ProgressBar max={maxVal} now={now} label={label} key={1} variant="success"/>
            <ProgressBar max={maxVal} now={maxVal} key={2} variant="danger" />
        </ProgressBar></ListGroupItem>
    </ListGroup>

}


export default UserSkillDefault