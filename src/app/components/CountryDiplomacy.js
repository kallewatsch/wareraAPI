import React from "react"
import { useSelector } from "react-redux"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert"

export const foo = (arr, key, val, target) => {
    // future me slappin me in the face
    const res = arr.find(item => item[key] == val)
    return res[target] || val
}



export const CountryDiplomacy = props => {

    const { name, allies, warsWith, enemy } = props
    const { countries } = useSelector(state => state.app)

    const objs = [
        { arr: allies, variant: "success"},
        { arr: warsWith, variant: "warning" },
        { arr: enemy ? [enemy] : enemy, variant: "danger" }
    ]

    const cols = objs.map((obj, i) => {
        const { arr, variant } = obj
        return (
            <Col key={i}>
                <Alert variant={variant}>
                    <ul>
                        {arr && arr.map((item, j) => <li key={j}>{foo(countries, '_id', item, 'name')}</li>)}
                    </ul>
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