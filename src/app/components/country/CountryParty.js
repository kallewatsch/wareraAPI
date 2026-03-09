import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { IconContext } from "react-icons"
import {
    GiCrossedSwords,
    GiPeaceDove,
    GiFactory,
    GiChestnutLeaf,
    GiShield,
    GiTeamIdea,
    GiCrown,
    GiVote
} from "react-icons/gi";

/* 

"militarism": 2,
      "isolationism": 1,
      "imperialism": 0,
      "industrialism": 0

*/

export const CountryParty = (props) => {

    const { ethics } = props

    const {
        militarism,
        isolationism,
        imperialism,
        industrialism
    } = ethics || { militarism: 0, isolationism: 0, imperialism: 0, industrialism: 0 }

    //console.log(props)

    return (
        <Row>
            <Col>
                <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                    {militarism > 0 && <GiCrossedSwords size={`${militarism * 2}em`} />}
                    {militarism < 0 && <GiPeaceDove size={`${militarism * -2}em`} />}
                    {industrialism > 0 && <GiFactory size={`${industrialism * 2}em`} />}
                    {industrialism < 0 && <GiChestnutLeaf size={`${industrialism * 2}em`} />}
                    {isolationism > 0 && <GiShield size={`${isolationism * 2}em`} />}
                    {isolationism < 0 && <GiTeamIdea size={`${isolationism * -2}em`} />}
                    {imperialism > 0 && <GiCrown size={`${imperialism * 2}em`} />}
                    {imperialism > 0 && <GiVote size={`${imperialism * -2}em`} />}
                </IconContext.Provider>
            </Col>
        </Row>
    )

}

export default CountryParty