import React, { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { sortByNameAsc } from "../../utils/arrayStuff"

export const CountrySelectModal = props => {

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
                    {countries && countries
                        .sort(sortByNameAsc)
                        .map((country, i) =>
                            <option key={i} value={country._id}>{country.name}</option>
                        )}
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleConfirm} disabled={!country}>
                    Ok
                </Button>
                <Button variant="secondary" onClick={() => handleClose(false)}>
                    Abort
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default CountrySelectModal