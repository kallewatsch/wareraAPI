import React from "react"
import Button from "react-bootstrap/Button"


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

export const TableRow = (props) => {

    const { item, tds, bla } = props
    
    const handleBla = event => {
        bla(item)
    }

    const foobar = (x) => {
        try {
            return x.toFixed(2)
        }
        catch {
            return x
        }
    }

    return (
        <tr>
            <td><Button onClick={handleBla}>details</Button></td>
            {tds && tds.map((td, i) => {
                const displayVal = getObjKeyViaAttrPath(item, td.attrPath, td.target)
                return <td key={i}>{foobar(displayVal)}</td>
            })}
        </tr>
    )

}


export default TableRow