import React, { useState, useEffect } from "react"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useDispatch } from 'react-redux'
import { useLazyGetMuByIdQuery, useLazyGetMusPaginatedQuery } from "../api"
import { setData } from "../appSlice"

export const MUs = () => {

    const [getMU, { data: muData, error: muError }] = useLazyGetMuByIdQuery()
    const [getMUsPaginated] = useLazyGetMusPaginatedQuery()
    const [muId, setMuId] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        let data = muData ? muData : muError
        dispatch(setData(data))
    }, [muData, muError])

    const handleChangeMuId = event => {
        setMuId(event.target.value)
    }

    const handleGetMU = event => {
        getMU({ muId })
    }

    const handleGetMUsPaginated = event => {
        let foo = { cursor: "Sat Jan 31 2026 11:05:07 GMT+0000 (Coordinated Universal Time)|697de1e370af1f7f8aa169ea", limit: 20 }
        getMUsPaginated(foo).then(result => {
            let data = result.error ? result.error : result.data.result.data
            dispatch(setData(data))
            //dispatch(setData(result.data.result.data))
            console.log(data)
        })
    }

    return <>
        <InputGroup>
            <Button onClick={handleGetMU} disabled={!muId}>getMU</Button>
            <Form.Control onChange={handleChangeMuId} placeholder="Enter MU ID" />
        </InputGroup>
        <Button onClick={handleGetMUsPaginated}>getMUsPaginated</Button>
        <b>TODO: interface and usage of filter criteria for getMUsPaginated</b>
    </>
}

export default MUs