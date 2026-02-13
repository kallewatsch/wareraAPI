import React from "react"
import SearchResultUser from "./SearchResultUser"

export const SearchResultDefault = props => {
    return <h1>default</h1>
}

const getComponent = (s) => {
    switch(s) {
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
        <>
            <h5>{resultType}</h5>
            
            {resultIds && resultIds.map((id, i) => <Compo key={i} resultId={id} />)}
        </>
    )

}


export default SearchResult