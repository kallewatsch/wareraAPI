import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import SimpleStats from "./SimpleStats"


export const CountryEconomy = props => {

    //const { taxes, money, development, specializedItem } = props
    const { taxes, ...simpleProps } = props

    return (
        <Row>
            <Col>
                <SimpleStats {...taxes} />
            </Col>
            <Col>
                <SimpleStats {...simpleProps} />
            </Col>
        </Row>
    )

}


export default CountryEconomy