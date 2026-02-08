import React from "react"
import SimpleStats from "./SimpleStats"


export const Company = props => {

    console.log("company props", props)

    return (
        <>
            <h5>{props.name}</h5>
            <SimpleStats {...props} />
        </>
        
    )

}


export default Company