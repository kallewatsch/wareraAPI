import React from "react"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import ProgressBar from "react-bootstrap/ProgressBar"


export const UserSkillRegen = (props) => {

    const {
        skillName,
        config,
        skill,
        ...otherProps
    } = props

    const key = skillName?.toLowerCase()
    const fuck = config?.skills?.[key]?.levels

    const maxVal = skill?.total
    const fuckVal = fuck?.[10]?.value
    const label = `${skill?.currentBarValue.toFixed(1)}/${maxVal}`
    const fuckLabel = `${maxVal}/${fuckVal}`

    return <ListGroup horizontal>
        <ListGroupItem style={{ width: "20%" }}>{skillName}:</ListGroupItem>
        <ListGroupItem style={{ width: "80%" }}><ProgressBar>
            <ProgressBar animated max={fuckVal} now={skill?.currentBarValue} label={label} key={1} variant="success" striped />
            <ProgressBar max={fuckVal} now={skill?.total} key={2} variant="secondary" striped />
            <ProgressBar max={fuckVal} now={fuckVal} label={fuckLabel} key={3} variant="danger" />
        </ProgressBar></ListGroupItem>
    </ListGroup>

}


export default UserSkillRegen