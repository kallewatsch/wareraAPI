import React, { useState } from "react"
import { getObjKeyViaAttrPath } from "../../../utils/fooStuff"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export const TableFilterItem = (props) => {

    const { ths, filters, addFilter } = props

    const [th, setTh] = useState('')
    const [filter, setFilter] = useState('')

    const handleChangeTh = event => {
        setTh(event?.target?.value)
    }

    const handleChangeFilter = event => {
        setFilter(event?.target?.value)
    }

    const handleClick = event => {
        addFilter(th, filter)
    }

    return (
        <>
            <Form.Select value={th} onChange={handleChangeTh}>
                <option value=''>Select Table Header</option>
                {ths && ths.map((th, i) => {
                    return <option key={i} value={th.id}>{th.txt}</option>
                })}
            </Form.Select>

            <Form.Select value={filter} onChange={handleChangeFilter}>
                <option value=''>Select Filter Type</option>
                {filters && filters.map((filter, i) => {
                    return <option key={i} value={filter?.name}>{filter?.name}</option>
                })}
            </Form.Select>
            <Button variant="success" onClick={handleClick} disabled={!th || !filter}>OK</Button>
        </>
    )

}


export default TableFilterItem