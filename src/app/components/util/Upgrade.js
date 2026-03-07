import React from "react"
import SimpleStats from "../SimpleStats"
import { useGetUpgradeQuery } from "../../api"

export const upgradeType = ["bunker", "base", "pacificationCenter", "storage", "automatedEngine", "breakRoom", "headquarters", "dormitories"]

export const getIdType = upgradeType => {
    switch (upgradeType) {
        case "bunker":
        case "base":
        case "pacificationCenter":
            return "regionId"
        case "storage":
        case "automatedEngine":
        case "breakRoom":
            return "companyId"
        /* case "headquarters":
        case "dormitories":
            return "muId" */
        default:
            return "muId"
    }
}


export const Upgrade = (props) => {

    const { id, upgradeType } = props
    const idType = getIdType(upgradeType)
    
    const { data: upgradeData, error, isLoading } = useGetUpgradeQuery({[idType]: id, upgradeType})

    const data = upgradeData?.result?.data 

    return (
        <>
            { isLoading && <span>'Loading...'</span>}
            {/* { data && idType == "regionId" }
            { data && idType == "companyId" }
            { data && idType == "muId" } */}
            { data &&  <SimpleStats {...data}/>}
            {/* { error &&  <SimpleStats {...error}/>} */}
        </>
    )

}


export default Upgrade