import React from "react"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import Accordion from "react-bootstrap/Accordion"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import RegionUpgrades from "../region/RegionUpgrades"

ChartJS.register(ArcElement, Tooltip, Legend);

export const getFooStatus = (upgrades) => {
    const pending = upgrades.filter(x => x.status == "pending")
    const active = upgrades.filter(x => x.status == "active")
    const disabled = upgrades.filter(x => x.status == "disabled")
    return [pending, active, disabled]
}

export const getPieData = (values, label) => {
    const isAllZero = [...values].reduce((a, b) => a + b) > 0 ? false : true;
    const labels = ['Pending', 'Active', 'Disabled']
    const _values = isAllZero ? [...values, 1] : values
    const _labels = isAllZero ? [...labels, 'No'] : labels
    const data = {
        labels: _labels,
        datasets: [
            {
                label: `${label}`,
                data: _values,
                backgroundColor: [
                    'rgba(222, 226, 14, 0.5)',
                    'rgba(54, 235, 99, 0.5)',
                    'rgba(205, 11, 11, 0.5)',
                    'rgba(230, 230, 230, 0.5)'
                ],
                borderColor: [
                    'rgba(222, 226, 14, 1)',
                    'rgba(54, 235, 99, 1)',
                    'rgba(205, 11, 11, 1)',
                    'rgba(230, 230, 230, 1)'
                ],
                borderWidth: 1,
            },
        ],
    }
    return data
}

export const CountryRegions = (props) => {

    const { name, countryRegions, countryRegionsUpgrades } = props

    const [bunkers, bases, pacCenters] = ["bunker", "base", "pacificationCenter"].map(upgradeType => countryRegionsUpgrades?.filter(x => x.upgradeType == upgradeType))

    const bunkerPieData = getPieData(getFooStatus(bunkers).map(x => x.length), 'Bunkers')
    const basePieData = getPieData(getFooStatus(bases).map(x => x.length), 'Military Bases')
    const pacPieData = getPieData(getFooStatus(pacCenters).map(x => x.length), 'Pacification Centers')
    return (
        <>
            <Row style={{ paddingBottom: "20px", marginBottom: "20px", minHeight: "350px" }}>
                <Col style={{ maxHeight: "300px" }}>
                    <h6>Bunkers</h6>
                    <Pie data={bunkerPieData} />
                </Col>
                <Col style={{ maxHeight: "300px" }}>
                    <h6>Military Bases</h6>
                    <Pie data={basePieData} />
                </Col>
                <Col style={{ maxHeight: "300px" }}>
                    <h6>Pacification Centers</h6>
                    <Pie data={pacPieData} />
                </Col>
            </Row>
            <Row>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            Show {name}'s  {countryRegions?.length || 0} Regions
                        </Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                {countryRegions?.length ? countryRegions.map((region, i) => {
                                    const regionUpgrades = countryRegionsUpgrades?.filter(upgrade => upgrade.region == region._id)
                                    const { deposit } = region
                                    return (
                                        <ListGroupItem key={i}>
                                            {region.name}
                                            {deposit && <img className="avatar" src={`https://app.warera.io/images/items/${deposit.type}.png?v=31`} alt={deposit.type} />}
                                            <RegionUpgrades regionUpgrades={regionUpgrades} />
                                        </ListGroupItem>
                                    )
                                }) : <span>{name} holds no Regions!</span>}
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>

        </>
    )

}


export default CountryRegions