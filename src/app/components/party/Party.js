import React from "react"
import SimpleStats from "../SimpleStats"

export const Party = props => {

    return (
        <>
            <h1>Hello Party</h1>
            <SimpleStats {...props} />
        </>
    )

}

export default Party