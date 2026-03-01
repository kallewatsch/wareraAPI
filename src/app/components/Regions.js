import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
import Accordion from "react-bootstrap/Accordion"
import Alert from "react-bootstrap/Alert"
import { useLazyGetRegionsQuery } from "../api"
import { setRegions } from "../appSlice"
import Region from "./Region"

export const Regions = () => {

    const [getRegions, { data: regionsData, error: regionsError, isLoading: regionsIsLoading }] = useLazyGetRegionsQuery()
    const { regions } = useSelector(state => state.app)
    const [activeKey, setActiveKey] = useState()

    const dispatch = useDispatch()

    // TODO: proper scrollIntoView, current one scrolls in the middle of the open accordion
    const handleSetActiveKeyAndScroll = key => {
        if (key == activeKey || !key) {
            setActiveKey("")
        } else {
            setActiveKey(key)
            setTimeout(() => {
                const el = document.getElementById(key)
                el.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                })
            }, 500)
        }
    }

    const handleGetRegions = async event => {
        try {
            const { result: { data: regions } } = await getRegions().unwrap()
            dispatch(setRegions(regions))
        } catch (err) {
            console.log(err)
        } finally {
            console.log("done")
        }
    }

    const sortedRegions = regions && Object.keys(regions)
        .map(region => regions[region])
        .sort((a, b) => a.code > b.code ? 1 : a.code < b.code ? -1 : 0)

    return <>
        <Alert variant="warning">Regions don't contain information about strategic resources but the country does?! WIP</Alert>
        <Button onClick={handleGetRegions}>getRegions</Button>
        <Accordion activeKey={activeKey} onSelect={handleSetActiveKeyAndScroll}>
            {sortedRegions.map((region, i) => {
                let regionProps = Object.assign({}, { ...region }, {setActiveKeyAndScroll: handleSetActiveKeyAndScroll })
                return <Region key={i} {...regionProps} />
            })}
        </Accordion>
    </>
}

export default Regions