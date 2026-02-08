import React, { useState } from "react"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import { useSelector } from "react-redux"


export const foo = (arr, key, val, target) => {
    // future me slappin me in the face
    const res = arr.find(item => item[key] == val)
    return res[target] || val
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
                    {countries.map((country, i) => <option key={i} value={country._id}>{country.name}</option>)}
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

    const { countries } = useSelector(state => state.app)
    const [showAttackers, setShowAttackers] = useState(false)
    const [attackers, setAttackers] = useState([])
    const [showDefenders, setShowDefenders] = useState(false)
    const [defenders, setDefenders] = useState([])

    const handleCloseAttackersModal = event => {
        setShowAttackers(false)
    }

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
            <Row>
                <Button disabled={!attackers.length || !defenders.length}>Compare</Button>
                <p><b>TODO: move state to redux, component to show useful attacker/defenders data</b></p>
            </Row>
            <MyModal {...attackersModalProps} />
            <MyModal {...defendersModalProps} />
        </>
    )

}

export default WarPlaner