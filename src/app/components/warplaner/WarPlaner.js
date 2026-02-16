import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import Card from "react-bootstrap/Card"
import CountrySelectModal from "./CountrySelectModal"
import WarPlanerCompare from "./WarPlanerCompare"
import { setWarPlaner } from "../../appSlice"
import { getNations, getValueFromArrayItem, getRemainigNations } from "../../utils/arrayStuff"
import "./WarPlaner.css"
import godzilla from "./godzilla.jpg"


export const WarPlaner = () => {

    const { countries, warplaner } = useSelector(state => state.app)
    const [showAttackers, setShowAttackers] = useState(false)
    const [attackers, setAttackers] = useState([])
    const [showDefenders, setShowDefenders] = useState(false)
    const [defenders, setDefenders] = useState([])

    const dispatch = useDispatch()

    const addAttacker = attacker => {
        setAttackers([...attackers, attacker])
        setShowAttackers(false)
    }

    const removeAttacker = (index) => {
        const updatedAttackers = [...attackers]
        updatedAttackers.splice(index, 1)
        setAttackers([...updatedAttackers])
    }

    const addDefender = defender => {
        setDefenders([...defenders, defender])
        setShowDefenders(false)
    }

    const removeDefender = (index) => {
        const updatedDefenders = [...defenders]
        updatedDefenders.splice(index, 1)
        setDefenders([...updatedDefenders])
    }

    const handleCompare = event => {
        const [allAttackers, attackerAllies] = getNations(countries, attackers, defenders)
        const [allDefenders, defenderAllies] = getNations(countries, defenders, attackers)
        dispatch(setWarPlaner({
            attackers: {
                ids: attackers,
                countries: allAttackers,
                allies: attackerAllies,
                excluded: []
            },
            defenders: {
                ids: defenders,
                countries: allDefenders,
                allies: defenderAllies,
                excluded: []
            }
        }))
    }

    const remainigCountries = getRemainigNations(countries, attackers, defenders)

    const attackersModalProps = {
        show: showAttackers, handleClose: setShowAttackers, confirm: addAttacker, countries: remainigCountries,
        title: 'Add Attacker'
    }

    const defendersModalProps = {
        show: showDefenders, handleClose: setShowDefenders, confirm: addDefender, countries: remainigCountries,
        title: 'Add Defender'
    }

    return (
        <>

            {!warplaner.attackers.ids.length || !warplaner.defenders.ids.length
                ? (
                    <>
                        <Row>
                            <Col>Select attackers and defenders and click compare</Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card bg="success">
                                    <Card.Header><h5>Attackers</h5></Card.Header>
                                    <Card.Img src={godzilla} className="imgGreen" />
                                    <Card.Body>
                                        {attackers && attackers.map((x, i) => {
                                            return (
                                                <InputGroup key={i} style={{ padding: '0px 0px 5px 5px' }}>
                                                    <InputGroup.Text>{getValueFromArrayItem(countries, '_id', x, 'name')}</InputGroup.Text>
                                                    <Button onClick={() => removeAttacker(i)}>remove</Button>
                                                </InputGroup>
                                            )
                                        })}
                                        <Button onClick={() => setShowAttackers(true)}>Add Attacker</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card bg="danger">
                                    <Card.Header><h5>Defenders</h5></Card.Header>
                                    <Card.Img src={godzilla} className="imgRed" />
                                    <Card.Body>
                                        {defenders && defenders.map((x, i) => {
                                            return (
                                                <InputGroup key={i} style={{ padding: '0px 0px 5px 5px' }}>
                                                    <InputGroup.Text>{getValueFromArrayItem(countries, '_id', x, 'name')}</InputGroup.Text>
                                                    <Button onClick={() => removeDefender(i)}>remove</Button>
                                                </InputGroup>
                                            )
                                        })}
                                        <Button onClick={() => setShowDefenders(true)}>Add Defender</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ textAlign: "center", marginTop: "50px" }}>
                                <Button disabled={!attackers.length || !defenders.length} onClick={handleCompare}>Compare</Button>
                            </Col>
                        </Row>
                    </>
                )
                : (
                    <WarPlanerCompare /* attackers={warplaner.attackers}
                        defenders={warplaner.defenders} */ />
                )
            }

            <p><b>TODO: what about allies which are defenders and attackers at the same time?</b></p>

            <CountrySelectModal {...attackersModalProps} />
            <CountrySelectModal {...defendersModalProps} />
        </>
    )

}

export default WarPlaner