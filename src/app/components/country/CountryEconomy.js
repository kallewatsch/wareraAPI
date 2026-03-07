import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { GiCoins, GiAqueduct, GiStarFormation } from "react-icons/gi"
import IconsWithOverlay from "../util/IconsWithOverlay"

export const CountryEconomy = props => {

    //const { taxes, money, development, specializedItem } = props
    const { taxes, money, development, specializedItem } = props

    const { income, market, selfWork } = taxes || {}

    const txts1 = [
        'Income Tax', 'Market', 'Trade Orders Fee',
        "Cash rules everything around me C.R.E.A.M. get the money Dollar, dollar bill, y'all", 'Development', 'Specialized Item'
    ]
    /* const txts2 = [
        "Cash rules everything around me C.R.E.A.M. get the money Dollar, dollar bill, y'all", 'Development', 'Specialized Item'
    ] */

    return (
        <Row>
            <Col>
                <IconsWithOverlay providerValue={{ size: '3em' }} txts={txts1}>
                    <span><GiCoins className="icon-gold" />: {income}%</span>
                    <span><GiCoins className="icon-gold" />: {market}%</span>
                    <span><GiCoins className="icon-gold" />: {selfWork}%</span>
                    <span><GiCoins className="icon-gold" />: {money?.toFixed(2)}</span>
                    <span><GiAqueduct className="icon-gray" />: {development?.toFixed(2)}</span>
                    <span><GiStarFormation className="icon-gold" />: {specializedItem}</span>
                </IconsWithOverlay>
            </Col>
            {/* <Col>
                <IconsWithOverlay providerValue={{ size: '3em' }} txts={txts2}>
                    <span><GiCoins className="icon-gold" />: {money?.toFixed(2)}</span>
                    <span><GiAqueduct className="icon-gray" />: {development?.toFixed(2)}</span>
                    <span><GiStarFormation className="icon-gold" />: {specializedItem}</span>
                </IconsWithOverlay>
            </Col> */}
        </Row>
    )

}


export default CountryEconomy