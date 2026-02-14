import React, { useState } from "react"
import { useGetRegionByIdQuery } from "../../api"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { BsBoxArrowInRight } from "react-icons/bs";
import Region from "../region/region"


export const SearchResultRegion = props => {

    const { resultId } = props
    const { data, error, isLoading } = useGetRegionByIdQuery({ regionId: resultId })
    const [show, setShow] = useState(false)

    const handleClose = event => {
        setShow(false)
    }

    const region = data && data.result.data

    return (
        <>
            <Button onClick={event => setShow(true)}>{!region ? resultId : region.name}</Button>
            <Modal show={show} onHide={handleClose} /* fullscreen */>
                <Modal.Header closeButton>
                    <Button target="_blank" href={`https://app.warera.io/region/${resultId}`}>{!region ? resultId : region.name}<BsBoxArrowInRight /></Button>
                </Modal.Header>
                <Modal.Body>
                    {region && <Region {...region} />}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SearchResultRegion