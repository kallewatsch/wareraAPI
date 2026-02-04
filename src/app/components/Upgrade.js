import React from "react"
import { useDispatch } from 'react-redux'
import { useLazyGetUpgradeQuery } from "../api"
import { setData } from "../appSlice"

export const Upgrade = () => {

    const [getUpgrade] = useLazyGetUpgradeQuery()
    const dispatch = useDispatch()

    const handleGetUpgrade = event => {
        dispatch(setData("soon"))
        /* getBattles().then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    return <>
        <button onClick={handleGetUpgrade}>getUpgrade</button>
    </>
}

export default Upgrade