import React, { useState } from "react"
import { useSelector } from 'react-redux'
import Row from "react-bootstrap/Row"
import SortableTable from "./util/SortableTable"

export const Countries = () => {

    const { countries } = useSelector(state => state.app)
    //const [thMode, setThMode] = useState('realtime')

    const handleSetActiveKeyAndScroll = key => {
        if (key == activeKey || !key) {
            setActiveKey("")
        } else {
            setActiveKey(key)
            setTimeout(() => {
                const el = document.getElementById(key)
                el.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                })
            }, 500)
        }
    }

    const handleChange = event => {
        setCountryId(event.target.value)
    }

    const handleChangeFilterName = event => {
        // TODO: maybe debounce this
        setFilterName(event.target.value)
    }

    // [...countries].map() to assign some wicked values. See intel/Intel
    const extendedCountries = [...countries]

    const ths = [
        { txt: "Name", attrPath: "", target: "name" },
        { txt: "Money?!", attrPath: "", target: "money" },
        { txt: "Wealth?!", attrPath: ["rankings", "countryWealth"], target: "value" },
        { txt: "Development", attrPath: "", target: "development" },
        { txt: "Item", attrPath: "", target: "specializedItem" },
        { txt: "Active Pop (rankings)", attrPath: ["rankings", "countryActivePopulation"], target: "value" }
    ]

    return <>
        {countries?.length && <Row>
            {/* <Button onClick={handleSetThMode}>toggle mode</Button> */}
            <h5>Countries{/* : | current mode: <Badge bg={thMode} txt={thMode}>{thMode}</Badge> */}</h5>
            <SortableTable items={[...extendedCountries]} ths={[...ths]} component="country" /* key={`${thMode}`} */ />
        </Row>}
    </>
}

export default Countries