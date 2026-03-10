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

    const fuck = config?.skills?.[skillName]?.levels || {}

    const maxVal = skill?.total
    const indexKey = Object.keys(fuck).at(-1)
    const fuckVal = fuck?.[indexKey]?.value
    const label = `${skill?.value}/${maxVal}`
    const fuckLabel = `${maxVal}/${fuckVal}`
    const now = skill?.value

    return <ListGroup horizontal>
        <ListGroupItem style={{ width: "20%", heigth: "250px" }}>{skillName}:</ListGroupItem>
        <ListGroupItem style={{ width: "80%", heigth: "250px" }}><ProgressBar>
            <ProgressBar max={fuckVal} now={now} label={label} key={1} variant="success"/>
            <ProgressBar max={fuckVal} now={fuckVal} label={fuckLabel} key={2} variant="danger" />
        </ProgressBar></ListGroupItem>
    </ListGroup>

}


export default UserSkillDefault