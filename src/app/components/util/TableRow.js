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

    const { item, tds, openModal, decimals } = props

    const handleClickDetails = event => {
        openModal(item)
    }

    const foobar = (x) => {
        // TODO: cleanup this and the formatValue madness in ./SortableTable
        let val
        try {
            val = decimals ? x.toFixed(decimals) : x
        } catch(err) {
            //console.log("foobar", err)
            val = x
        } finally {
            return `${val}`
        }
        /* try {
            return decimals ? x.toFixed(decimals) : x
        }
        catch {
            return x
        } */
    }

    const clsName = item.infos?.isBanned ? 'tr-banned' : ''

    return (
        <tr className={clsName}>
            <td><Button onClick={handleClickDetails}>details</Button></td>
            {tds && tds.map((td, i) => {
                const displayVal = getObjKeyViaAttrPath(item, td.attrPath, td.target)
                return <td key={i}>{foobar(displayVal)}</td>
            })}
        </tr>
    )

}


export default TableRow