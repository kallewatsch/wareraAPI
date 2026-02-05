import React from "react"
import { useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
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
        <Button onClick={handleGetUpgrade}>getUpgrade</Button>
    </>
}

export default Upgrade