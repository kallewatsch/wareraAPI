import React from "react"
import Badge from "react-bootstrap/Badge"
import SearchResultCountry from "./SearchResultCountry"
import SearchResultMu from "./SearchResultMu"
import SearchResultParty from "./SearchResultParty"
import SearchResultUser from "./SearchResultUser"
import SearchResultRegion from "./SearchResultRegion"
import "./SearchResult.css"

export const SearchResultDefault = props => {
    return <h1>default</h1>
}

const getComponent = (s) => {
    switch (s) {
        case "countryIds":
            return SearchResultCountry
        case "muIds":
            return SearchResultMu
        case "partyIds":
            return SearchResultParty
        case "regionIds":
            return SearchResultRegion
        case "userIds":
            return SearchResultUser
        default:
            return SearchResultDefault
    }
}

export const SearchResult = props => {

    const { resultType, resultIds } = props
    const Compo = getComponent(resultType)

    return (
        <div className="searchResultContainer">
            <h5>{resultType.replace("Id", "")}</h5>
            {!resultIds.length && <Badge bg="warning">There are no matching {resultType}</Badge>}
            {resultIds && resultIds.map((id, i) => <Compo key={i} resultId={id} />)}
        </div>
    )

}


export default SearchResult