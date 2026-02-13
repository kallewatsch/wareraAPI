import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { resetWarPlaner } from "../../appSlice"
import CountriesTable from "./CountriesTable"


export const WarPlanerCompare = props => {

    const { attackers, defenders } = props
    const [includeAllies, setIncludeAllies] = useState(true)

    const dispatch = useDispatch()

    const handleReset = event => {
        dispatch(resetWarPlaner())
    }

    const handleFuck = event => {
        setIncludeAllies(!includeAllies)
    }

    const attackerCountries = includeAllies ? [...attackers.countries, ...attackers.allies] : attackers.countries
    const defenderCountries = includeAllies ? [...defenders.countries, ...defenders.allies] : defenders.countries


    return (
        <>
            <Row>
                <Col>
                    <Button onClick={handleFuck}>{includeAllies ? 'exclude allies' : 'include allies'}</Button>
                    <Button onClick={handleReset}>Reset</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <CountriesTable key={includeAllies ? 'cta1' : 'cta2'} countries={attackerCountries} variant={"success"}/>
                </Col>
                <Col xs={6}>
                    <CountriesTable key={includeAllies ? 'ctd1' : 'ctd2'} countries={defenderCountries} variant={"danger"} />
                </Col>
            </Row>
        </>
    )

}


export default WarPlanerCompare