import React from "react"
import { useLazyGetGovernmentByIdQuery } from "../../api"
import ProgressBar from "react-bootstrap/ProgressBar"
import Button from "react-bootstrap/Button"
import "./CountryPolitics.css"
import SimpleStats from "../SimpleStats"

export const CountryPolitics = (props) => {

    const { rulingParty, unrest, countryId } = props

    const [getGovernmentById, { data, error, isLoading }] = useLazyGetGovernmentByIdQuery()

    const nowVal = (unrest.bar / unrest.barMax) * 100


    return (
        <div className="countryPolitics">
            <h6>rulingParty: {rulingParty}</h6>
            Last Unrest Contribution: {unrest.lastContributionAt || '-'}
            <ProgressBar now={nowVal} label={`${nowVal.toFixed(2)}%`} variant="warning" />
            <Button onClick={() => getGovernmentById({countryId})} disabled={!countryId}>getGovernment</Button>
            {data && <SimpleStats {...data} />}
        </div>
    )

}


export default CountryPolitics