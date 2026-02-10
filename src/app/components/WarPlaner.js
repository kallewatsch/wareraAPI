import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import WarPlanerCompare from "./WarPlanerCompare"
import { setWarPlaner } from "../appSlice"


export const foo = (arr, key, val, target) => {
    // future me slappin me in the face
    const res = arr.find(item => item[key] == val)
    return res[target] || val
}

export const getAllies = countries => {
    return countries.map(country => country.allies)
        .flat()
        .reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
}

export const getNations = (countries, idsFriendly, idsHostile) => {
    const nations = countries.filter(country => idsFriendly.some(id => id == country._id))
    const alliesIds = getAllies(nations)
    const alliesIdsClean = alliesIds.filter(item => idsHostile.every(id => id != item))
    //return [...nations, ...countries.filter(country => alliesIdsClean.some(id => id == country._id))]
    return [[...nations], [...countries.filter(country => alliesIdsClean.some(id => id == country._id))]]
}

export const MyModal = props => {

    const { show, handleClose, confirm, countries, title } = props
    const [country, setCountry] = useState()

    const handleChange = event => {
        setCountry(event.target.value)
    }

    const handleConfirm = event => {
        confirm(country)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Select onChange={handleChange}>
                    <option value="">Select Country</option>
                    {countries
                        .sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
                        .map((country, i) =>
                            <option key={i} value={country._id}>{country.name}</option>
                        )}
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleConfirm} disabled={!country}>
                    Ok
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Abort
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

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
                allies: attackerAllies
            },
            defenders: {
                ids: defenders,
                countries: allDefenders,
                allies: defenderAllies
            }
        }))

        /* const weeklyDamgeAttackers = allAttackers.reduce((acc, cur) => acc + cur.rankings.weeklyCountryDamages.value, 0)
        const weeklyDamageDefenders = allDefenders.reduce((acc, cur) => acc + cur.rankings.weeklyCountryDamages.value, 0) */
    }


    const remainigCountries = countries && countries.filter(country =>
        attackers.every(id => id != country._id) && defenders.every(id => id != country._id)
    )

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
                            <Col>
                                <h5>Attackers</h5>
                                {attackers && attackers.map((x, i) => {
                                    return (
                                        <InputGroup key={i}>
                                            <InputGroup.Text>{foo(countries, '_id', x, 'name')}</InputGroup.Text>
                                            <Button onClick={() => removeAttacker()}>remove</Button>
                                        </InputGroup>
                                    )
                                })}
                                <Button onClick={() => setShowAttackers(true)}>Add Attacker</Button>
                            </Col>
                            <Col>
                                <h5>Defenders</h5>
                                {defenders && defenders.map((x, i) => {
                                    return (
                                        <InputGroup key={i}>
                                            <InputGroup.Text>{foo(countries, '_id', x, 'name')}</InputGroup.Text>
                                            <Button onClick={() => removeDefender()}>remove</Button>
                                        </InputGroup>
                                    )
                                })}
                                <Button onClick={() => setShowDefenders(true)}>Add Defender</Button>
                            </Col>
                        </Row>
                        <Row><Col>
                            <Button disabled={!attackers.length || !defenders.length} onClick={handleCompare}>Compare</Button>
                        </Col></Row>
                    </>
                )
                : (
                    <WarPlanerCompare attackers={warplaner.attackers}
                        defenders={warplaner.defenders} />
                )
            }

            {/* <Button disabled={!attackers.length || !defenders.length} onClick={handleCompareNations}>Compare</Button> */}
            <p><b>TODO: what about allies which are defenders and attackers at the same time?</b></p>

            <MyModal {...attackersModalProps} />
            <MyModal {...defendersModalProps} />
        </>
    )

}

export default WarPlaner