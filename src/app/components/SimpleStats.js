import React from "react"
import Table from "react-bootstrap/Table"

export const SimpleStats = props => {

    return (
        <Table>
            <tbody>
                {Object.keys(props).map((key, i) => <tr key={i}><td>{key}</td><td><pre>{JSON.stringify(props[key], null, 2)}</pre></td></tr>)}
            </tbody>
        </Table>
    )

}

export default SimpleStats