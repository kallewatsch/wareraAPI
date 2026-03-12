import React, { useState } from "react"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

export const FilterWidgetSingleValue = props => {

    const { text, index, remove, changeWidgetValue, hasFocus } = props

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
            <InputGroup className={value !== 0 && !value ? 'highlightEmpty' : ''}>
                <InputGroup.Text>{text}</InputGroup.Text>
                <FormControl onChange={handleChange} value={value} name={`filterWidget${index}`} placeholder="Enter Value" autoFocus={hasFocus} />
                <Button variant="danger" onClick={handleRemove}>remove</Button>
            </InputGroup>

        </>
    )

}


export default FilterWidgetSingleValue