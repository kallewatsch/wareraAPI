import React, { useState } from "react"


export const getObjKeyViaAttrPath = (obj, attrPath, key) => {

    let _obj = Object.assign({}, obj)

    for (let prop of attrPath) {
        if (!_obj.hasOwnProperty(prop)) {
            return undefined
        }
        _obj = Object.assign({}, { ..._obj[prop] })
    }
    return _obj[key]

}

export const sortByFoo = (items, attrPath, key) => {
    return [...items].sort((a, b) => {
        const foo = getObjKeyViaAttrPath(a, attrPath, key)
        const bar = getObjKeyViaAttrPath(b, attrPath, key)
        if (!foo) {
            return -1
        }
        if (!bar) {
            return 1
        }
        return foo > bar ? 1 : foo < bar ? -1 : 0
    })
}


export const TableHeader = (props) => {

    const { items, ths, sortItems } = props

    //const [sortedItems, setSortedItems] = useState(items)

    /* const handleSortTable = (event, attrPath, key) => {
        console.log({ attrPath })
        const sortedFucks = sortByFoo(items, attrPath, key)
        console.log(items)
        if (items.every((item, i) => sortedFucks[i] && item._id == sortedFucks[i]._id)) {
            sortItems(sortedFucks.reverse())
        }
        else {
            sortItems(sortedFucks)
        }

    } */

    return (
        <thead>
            <tr>
                <th>Show</th>
                {ths && ths.map((th, i) => {
                    return <th onClick={event => sortItems(event, th.attrPath, th.target)} key={i}>{th.txt}</th>
                })}
            </tr>
            <tr></tr>
        </thead>
    )

}


export default TableHeader