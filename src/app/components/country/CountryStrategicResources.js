import React from "react"
import { useSelector } from "react-redux"
import ListGroup from "react-bootstrap/ListGroup"
import SimpleStats from "../SimpleStats"


export const CountryStrategicResources = props => {
    const { resources, bonuses } = props

    const { regions } = useSelector(state => state.app)

    return (
        <>
            <h6>Strategic Resources</h6>
            <ListGroup>
                {bonuses && Object.keys(bonuses).map((key, i) => {
                    return (
                        <ListGroup.Item key={i}>{key}: {bonuses[key]}</ListGroup.Item>
                    )
                })}
            </ListGroup>
            {resources && Object.keys(resources).map((key, i) => {
                return (
                    <div key={i}>
                        <h6>{key}</h6>
                        <ListGroup>
                            {resources[key].map((regionId, j) => {
                                //const regionName = regions[regionId]?.name
                                return <ListGroup.Item key={j}>{regions[regionId]?.name}</ListGroup.Item>
                            })}
                        </ListGroup>
                    </div>
                )

            })}
           {/*  <SimpleStats {...props} /> */}
        </>

    )

}

export default CountryStrategicResources