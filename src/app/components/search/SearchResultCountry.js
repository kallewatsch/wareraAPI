import React, { useState } from "react"
import { useGetCountryByIdQuery } from "../../api"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { BsBoxArrowInRight } from "react-icons/bs";
import Country from "../country/Country"


export const SearchResultCountry = props => {

    const { resultId } = props
    const { data, error, isLoading } = useGetCountryByIdQuery({ countryId: resultId })
    const [show, setShow] = useState(false)

    const handleClose = event => {
        setShow(false)
    }

    const country = data && data.result.data

    return (
        <>
            <Button onClick={event => setShow(true)}>{!country ? resultId : country.name}</Button>
            <Modal show={show} onHide={handleClose} fullscreen>
                <Modal.Header closeButton>
                    <Button target="_blank" href={`https://app.warera.io/country/${resultId}`}>{!country ? resultId : country.name}<BsBoxArrowInRight /></Button>
                </Modal.Header>
                <Modal.Body>
                    {country && <Country {...country} />}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SearchResultCountry