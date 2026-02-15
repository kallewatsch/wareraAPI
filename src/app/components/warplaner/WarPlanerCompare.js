import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import Button from "react-bootstrap/Button"
import { resetWarPlaner, setWarPlaner } from "../../appSlice"
import CountriesTable from "./CountriesTable"
import CountriesPie from "./CountriesPie"


export const WarPlanerCompare = props => {

    const { attackers, defenders } = useSelector(state => state.app.warplaner)
    const [includeAllies, setIncludeAllies] = useState(true)

    const dispatch = useDispatch()

    const handleReset = event => {
        dispatch(resetWarPlaner())
    }

    const handleFuck = event => {
        setIncludeAllies(!includeAllies)
        const payload = {
            attackers: Object.assign({}, { ...attackers }, { excluded: includeAllies ? attackers.allies.map((x => x._id)) : [] }),
            defenders: Object.assign({}, { ...defenders }, { excluded: includeAllies ? defenders.allies.map((x => x._id)) : [] })
        }
        dispatch(setWarPlaner(payload))
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
                <Tabs
                    defaultActiveKey="table"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="table" title="Table">
                        <Row>
                            <Col xs={6}>
                                <CountriesTable variant={"success"} team="attackers" />
                            </Col>
                            <Col xs={6}>
                                <CountriesTable variant={"danger"} team="defenders" />
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="chart" title="Chart">
                        <Row>
                            <Col xs={6}>
                                <h5>demo weekly dmg</h5>
                                <CountriesPie key={includeAllies ? 'ctp1' : 'ctp2'} attackers={attackers} defenders={defenders} />
                            </Col>
                            <Col xs={6}>
                                <h5>component to show diff between team1.stat and team2.stat</h5>
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>

            </Row>
        </>
    )

}


export default WarPlanerCompare