import React, { useState } from "react"
import { useGetUserQuery } from "../../api"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { BsBoxArrowInRight } from "react-icons/bs";
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
                    <Button target="_blank" href={`https://app.warera.io/user/${resultId}`}>{!user ? resultId : user.username}<BsBoxArrowInRight /></Button>
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