import React, { useState } from "react"
import { FormControl, InputGroup, Button, Alert } from "react-bootstrap"
import Modal from "react-bootstrap/Modal"
import { useDispatch, useSelector } from "react-redux"
import { setApiKey, setRateLimit, setReady, setShowModal } from "../../slices/apikeySlice"
import { GiCheckMark, GiSpy } from "react-icons/gi"

export const ApiKeyModal = (props) => {

    const { apiKey, showModal, ready } = useSelector(state => state.app.apikey)
    const [key, setKey] = useState(apiKey)

    const dispatch = useDispatch()

    const validApiKey = key.match(/wae_[a-z0-9]{64}$/g)

    const handleClose = event => {
        dispatch(setShowModal(false))
    }

    const handleChange = event => {
        setKey(event.target.value)
        //dispatch(setApiKey(event.target.value))
    }

    const handleConfirmAnon = event => {
        dispatch(setApiKey(''))
        dispatch(setRateLimit(100))
        dispatch(setReady(true))
        dispatch(setShowModal(false))
        setKey('')
    }

    const handleConfirm = event => {
        const rateLimit = key && validApiKey ? 500 : 100
        dispatch(setApiKey(key))
        dispatch(setRateLimit(rateLimit))
        dispatch(setReady(true))
        dispatch(setShowModal(false))
    }

    return (
        <Modal show={!ready || showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>API Key</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="light">
                    API has a rate limit of 100 requests per minute.
                    Bring your own token to increase to 500 or proceed anonymously.
                </Alert>
                <InputGroup>
                    <FormControl placeholder="Proceed without API Key" disabled />
                    <Button onClick={handleConfirmAnon}><GiSpy size="2em"/></Button>
                </InputGroup>
                <InputGroup>
                    <FormControl placeholder="Enter API Key: wae_" value={key} onChange={handleChange}
                        isInvalid={key && !validApiKey} isValid={key && validApiKey} />
                    <Button disabled={!validApiKey} onClick={handleConfirm}><GiCheckMark size="2em"/></Button>
                    <FormControl.Feedback type="invalid">Invalid token</FormControl.Feedback>
                </InputGroup>
            </Modal.Body>
        </Modal>
    )

}


export default ApiKeyModal