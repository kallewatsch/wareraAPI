import React from "react"
import SimpleStats from "../SimpleStats"
import Ranking from "../ranking/Ranking"


export const Mu = props => {

    const { rankings, ...otherProps } = props

    return (
        <>
            <h1>Hello Mu</h1>
            {Object.keys(rankings).map((key,i) => <Ranking key={i} {...rankings[key]} title={key} />)}
            <SimpleStats {...otherProps} />
        </>
    )

}

export default Mu