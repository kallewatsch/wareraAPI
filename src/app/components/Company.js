import React from "react"
import { useGetWorkersQuery } from "../api"
import SimpleStats from "./SimpleStats"


export const Company = props => {

    console.log("company props", props)
    const {data, error, isLoading} = useGetWorkersQuery({companyId: props._id})
    console.log(data)

    return (
        <>
            <h5>{props.name}</h5>
            <SimpleStats {...props} />
        </>
        
    )

}


export default Company