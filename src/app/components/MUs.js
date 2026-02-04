import React from "react"
import { useDispatch } from 'react-redux'
import { useLazyGetMuByIdQuery, useLazyGetMusPaginatedQuery } from "../api"
import { setData } from "../appSlice"

export const MUs = () => {

    const [getMU] = useLazyGetMuByIdQuery()
    const [getMUsPaginated] = useLazyGetMusPaginatedQuery()

    const dispatch = useDispatch()


    const handleGetMU = event => {
        //dispatch(setData("soon"))
        let data = {muId: "697636e86fe3abaeb1a1c4a6"}
        getMU(data).then(result => {
            dispatch(setData(result.data.result.data))
        })
    }

    const handleGetMUsPaginated = event => {
        //dispatch(setData("soon"))
        let data = {orgId: "6813b6e73e57e0601e792aa9", limit: 20}
        getMUsPaginated(data).then(result => {
            dispatch(setData(result.data.result.data))
        })
    }

    return <>
        <button onClick={handleGetMU}>getMU</button>
        <button onClick={handleGetMUsPaginated}>getMUsPaginated</button>
    </>
}

export default MUs