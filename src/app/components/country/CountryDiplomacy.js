import React from "react"
import { useSelector } from "react-redux"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert"
import ListGroup from "react-bootstrap/ListGroup"
import { getValueFromArrayItem } from "../../utils/arrayStuff"


export const CountryDiplomacy = props => {

    const { allies, warsWith, enemy } = props
    const { countries } = useSelector(state => state.app)

    const objs = [
        { arr: allies, variant: "success", title: "Allies" },
        { arr: warsWith, variant: "warning", title: "Wars" },
        { arr: enemy ? [enemy] : enemy, variant: "danger", title: "Arch Enemy" }
    ]

    const cols = objs.map((obj, i) => {
        const { arr, variant, title } = obj
        return (
            <Col key={i}>
                <Alert variant={variant}>
                    <h6>{title}</h6>
                    <ListGroup>
                        {arr && arr.map((item, j) => {
                            const countryName = getValueFromArrayItem(countries, '_id', item, 'name')
                            const countryCode = getValueFromArrayItem(countries, '_id', item, 'code')
                            return (
                                <ListGroup.Item key={j} variant={variant}>
                                    <img
                                        alt={countryName}
                                        src={`https://app.warera.io/images/flags/${countryCode}.svg?v=16`} />
                                    {countryName}
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Alert>
            </Col>
        )
    })

    return (
        <Row>
            {cols}
        </Row>
    )

}


export default CountryDiplomacy