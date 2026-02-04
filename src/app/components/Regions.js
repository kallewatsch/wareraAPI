import React from "react"
import { useDispatch } from 'react-redux'
import { useLazyGetRegionByIdQuery, useLazyGetRegionsQuery } from "../api"
import { setData } from "../appSlice"

export const Regions = () => {

    const [getRegions] = useLazyGetRegionsQuery()
    const [getRegionById] = useLazyGetRegionByIdQuery()

    const dispatch = useDispatch()
    let data = {
            regionId: '6813b7049403bc4170a5d6de'
    }

    const handleGetRegions = event => {
        getRegions().then(result => {
            dispatch(setData(result.data.result.data))
        })
    }

    const handleGetRegionById = event => {
        getRegionById(data).then(result => {
            dispatch(setData(result.data.result.data))
        })
    }

    return <>
        <button onClick={handleGetRegionById}>getRegion</button>
        <button onClick={handleGetRegions}>getRegions</button>
    </>
}

export default Regions