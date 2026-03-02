import React, { useState } from "react"
import { useSelector } from 'react-redux'
import Row from "react-bootstrap/Row"
import SortableTable from "./util/SortableTable"
import { Alert } from "react-bootstrap"

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
        /* { txt: "Money??", attrPath: "", target: "money" }, */ // Country.money probably deprecated. use Country.rankings.countryWealth.value instead
        { txt: "Wealth", attrPath: ["rankings", "countryWealth"], target: "value" },
        { txt: "Development", attrPath: "", target: "development" },
        { txt: "Item", attrPath: "", target: "specializedItem" },
        { txt: "Active Pop (rankings)", attrPath: ["rankings", "countryActivePopulation"], target: "value" }
    ]

    return <>
        <Alert>
            <h5><i>Bedienungsanleitung</i></h5>
            <ul>
                <li>Tableheaders klicken zum sortieren</li>
                <li>Mit Add Filter hinzufügen und Wert eintragen</li>
                <li>Apply Filter wendet alle filter an</li>
            </ul>
        </Alert>
        {countries?.length && <Row>
            {/* <Button onClick={handleSetThMode}>toggle mode</Button> */}
            <h5>Countries{/* : | current mode: <Badge bg={thMode} txt={thMode}>{thMode}</Badge> */}</h5>
            <SortableTable items={[...extendedCountries]} ths={[...ths]} component="country" /* key={`${thMode}`} */ />
        </Row>}
    </>
}

export default Countries