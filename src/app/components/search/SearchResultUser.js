import React, { useState } from "react"
import { useGetUserQuery } from "../../api"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import User from "../user/User"

export const SearchResultUser = props => {

    const { resultId } = props
    const { data, error, isLoading } = useGetUserQuery({ userId: resultId })
    const [show, setShow] = useState(false)

    const handleClose = event => {
        setShow(false)
    }

    const user = data && data.result.data

    return (
        <>
            <Button onClick={event => setShow(true)}>{!user ? resultId : user.username}</Button>
            <Modal show={show} onHide={handleClose} fullscreen>
                <Modal.Header closeButton>
                    <Modal.Title>{!user ? resultId : user.username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {user && <User {...user} />}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SearchResultUser