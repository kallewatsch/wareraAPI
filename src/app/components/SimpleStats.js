import React from "react"
import Table from "react-bootstrap/Table"

export const SimpleStats = props => {

    return (
        <Table>
            {Object.keys(props).map((key,i) =><tr><td>{key}</td><td><pre>{JSON.stringify(props[key], null, 2)}</pre></td></tr>)}
        </Table>
    )

}

export default SimpleStats