import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setSkill } from "../../slices/skillbuildSlice"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import ProgressBar from "react-bootstrap/ProgressBar"
import Button from "react-bootstrap/Button"
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleDoubleRight, FaAngleRight } from "react-icons/fa";
import "./Skillbuild.css"

export const Skill = (props) => {

    const { name, icon } = props
    const { skills } = useSelector(state => state.app.skillbuild)
    const now = skills[name]

    const dispatch = useDispatch()

    const handleMinus = event => {
        if (now > 0) {
            dispatch(setSkill({ name, value: now - 1 }))
        }
    }

    const handlePlus = event => {
        if (now < 10) {
            dispatch(setSkill({ name, value: now + 1 }))
        }
    }

    const handleMin = event => {
        dispatch(setSkill({ name, value: 0 }))
    }

    const handleMax = event => {
        dispatch(setSkill({ name, value: 10 }))
    }

    return (
        <>
            <ListGroup horizontal className="skill">
                <ListGroupItem>
                    <Button onClick={handleMin}><FaAngleDoubleLeft /></Button>
                </ListGroupItem>
                <ListGroupItem>
                    <Button onClick={handleMinus}><FaAngleLeft /></Button>
                </ListGroupItem>
                <ListGroupItem>
                    {icon}
                </ListGroupItem>
                <ListGroupItem>
                    <ProgressBar>
                        <ProgressBar now={now} max={10} label={now} />
                    </ProgressBar>
                </ListGroupItem>
                <ListGroupItem>
                    <Button onClick={handlePlus}><FaAngleRight /></Button>
                </ListGroupItem>
                <ListGroupItem>
                    <Button onClick={handleMax}><FaAngleDoubleRight /></Button>
                </ListGroupItem>
            </ListGroup>
        </>
    )

}


export default Skill