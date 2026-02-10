import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { resetWarPlaner } from "../appSlice"
import CountriesTable from "./CountriesTable"


export const WarPlanerCompare = props => {

    const { attackers, defenders } = props
    const [includeAllies, setIncludeAllies] = useState(true)

    const dispatch = useDispatch()
    /* const handleCompare = event => {
        const weeklyDamgeAttackers = allAttackers.reduce((acc, cur) => acc + cur.rankings.weeklyCountryDamages.value, 0)
        const weeklyDamageDefenders = allDefenders.reduce((acc, cur) => acc + cur.rankings.weeklyCountryDamages.value, 0)
    } */

    const handleReset = event => {
        dispatch(resetWarPlaner())
    }

    const handleFuck = event => {
        setIncludeAllies(!includeAllies)
    }

    return (
        <>
            <Row>
                <Col>
                    <Button onClick={handleFuck}>{includeAllies ? 'exclude allies' : 'include allies'}</Button>
                    <Button onClick={handleReset}>Reset</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    attackers: {attackers.countries.reduce((acc, cur) => acc + cur.rankings.weeklyCountryDamages.value, 0)}
                    <CountriesTable key={includeAllies ? 'fuck1' : 'fuck2'} countries={includeAllies ? [...attackers.countries, ...attackers.allies] : attackers.countries} />
                </Col>
                <Col>
                    defenders: {defenders.countries.reduce((acc, cur) => acc + cur.rankings.weeklyCountryDamages.value, 0)}
                    <CountriesTable key={includeAllies ? 'shit1' : 'shit2'} countries={includeAllies ? [...defenders.countries, ...defenders.allies] : defenders.countries} />
                </Col>
            </Row>
        </>
    )

}


export default WarPlanerCompare