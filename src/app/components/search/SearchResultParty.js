import React, { useState } from "react"
import { useGetPartyByIdQuery } from "../../api"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { BsBoxArrowInRight } from "react-icons/bs";
import Party from "../party/Party"


export const SearchResultParty = props => {

    const { resultId } = props
    const { data, error, isLoading } = useGetPartyByIdQuery({ partyId: resultId })
    const [show, setShow] = useState(false)

    const handleClose = event => {
        setShow(false)
    }

    const party = data && data.result.data

    return (
        <>
            <Button onClick={event => setShow(true)}>{!party ? resultId : party.name}</Button>
            <Modal show={show} onHide={handleClose} fullscreen>
                <Modal.Header closeButton>
                    <Button target="_blank" href={`https://app.warera.io/party/${resultId}`}>{!party ? resultId : party.name}<BsBoxArrowInRight /></Button>
                </Modal.Header>
                <Modal.Body>
                    {party && <Party {...party} />}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SearchResultParty