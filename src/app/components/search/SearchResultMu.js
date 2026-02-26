import React, { useState } from "react"
import { useGetMuByIdQuery } from "../../api"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { BsBoxArrowInRight } from "react-icons/bs";
import Mu from "../mu/Mu"


export const SearchResultMu = props => {

    const { resultId } = props
    const { data, error, isLoading } = useGetMuByIdQuery({ muId: resultId })
    const [show, setShow] = useState(false)

    const handleClose = event => {
        setShow(false)
    }

    const mu = data && data.result.data

    return (
        <>
            <Button onClick={event => setShow(true)}>{!mu ? resultId : mu.name}</Button>
            <Modal show={show} onHide={handleClose} fullscreen>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Button target="_blank" href={`https://app.warera.io/mu/${resultId}`}>{!mu ? resultId : mu.name}<BsBoxArrowInRight /></Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {mu && <Mu {...mu} />}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SearchResultMu