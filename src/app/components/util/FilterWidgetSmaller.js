import React, { useState } from "react"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

export const FilterWidgetSmaller = props => {

    const { text, index, remove, changeWidgetValue } = props

    const [value, setValue] = useState('')

    const handleChange = event => {
        changeWidgetValue(event?.target?.value, index)
        setValue(event?.target?.value)
    }

    const handleRemove = event => {
        remove(index)
    }

    return (
        <>
            <InputGroup>
                <InputGroup.Text>{text}</InputGroup.Text>
                <FormControl onChange={handleChange} value={value} />
                <Button variant="danger" onClick={handleRemove}>remove</Button>
            </InputGroup>

        </>
    )

}


export default FilterWidgetSmaller