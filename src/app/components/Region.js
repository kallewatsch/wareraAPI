import React from "react"
import { useSelector } from "react-redux"
import Accordion from "react-bootstrap/Accordion"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"

/* 
{
    "stats": {
      "investedMoney": 0
    },
    "dates": {},
    "_id": "6813b7039403bc4170a5d68a",
    "code": "ch-zurich",
    "country": "6813b6d446e731854c7ac7a6",
    "initialCountry": "6813b6d446e731854c7ac7a6",
    "neighbors": [
      "6813b7049403bc4170a5d6ba",
      "6813b7039403bc4170a5d6b7",
      "6813b7049403bc4170a5d6de",
      "6813b7039403bc4170a5d686",
      "6813b7039403bc4170a5d68d",
      "6813b7049403bc4170a5d70e",
      "696a81f5882256e1db118204"
    ],
    "isCapital": false,
    "isLinkedToCapital": true,
    "upgradesV2": {
      "upgrades": {
        "base": {
          "level": 2,
          "constructionPoints": 0,
          "investedMoney": 300,
          "constructionStartedAt": "2025-06-19T18:05:02.150Z",
          "isUnderConstruction": null,
          "lastConstructions": [],
          "status": "disabled",
          "constructionEndedAt": "2025-06-19T18:39:04.454Z",
          "statusChangedAt": "2025-06-24T00:48:48.431Z"
        }
      },
      "activeConstructionCount": 0
    },
    "name": "Zurich",
    "mainCity": "Zurich",
    "development": 3.2,
    "baseDevelopment": 3.2,
    "countryCode": "ch",
    "position": [
      8.5417,
      47.3769
    ],
    "biome": "forest",
    "climate": "moderate",
    "__v": 26,
    "resistance": 40,
    "activeUpgradeLevels": {}
  }

*/


export const Region = (props) => {
    const { name, mainCity, neighbors, country, initialCountry, setActiveKeyAndScroll } = props
    const { regions, countries } = useSelector(state => state.app)
    const neighborNames = regions && neighbors.map(n => regions[n].name)
    const countryCurrent = countries && countries.find(c => c._id == country)
    const countryInitial = countries && countries.find(c => c._id == initialCountry)

    const eventKey = name.replace(/\s/g, "")

    return (
        <Accordion.Item eventKey={eventKey} id={eventKey}>
            <Accordion.Header>{name} | {mainCity} | {countryInitial.name} | {countryCurrent.name}</Accordion.Header>
            <Accordion.Body>
                <h3>Neighbors</h3>
                <ListGroup>
                    {neighborNames.map((name, i) => <Accordion.Button key={i} as={ListGroupItem} onClick={() => setActiveKeyAndScroll(name.replace(/\s/g, ""))}>{name}</Accordion.Button>)}
                </ListGroup>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Region