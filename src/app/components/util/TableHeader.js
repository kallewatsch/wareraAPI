import React from "react"


export const TableHeader = (props) => {

    const { ths, sortItems } = props

    return (
        <thead>
            <tr>
                <th>Show</th>
                {ths && ths.map((th, i) => {
                    return <th onClick={event => sortItems(event, th.attrPath, th.target)} key={i}>{th.icon || th.txt}</th>
                })}
            </tr>
            <tr></tr>
        </thead>
    )

}


export default TableHeader