import React from "react"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

export const FilterWidgetBetween = props => {

    const { text, index, remove } = props

    const handleRemove = event => {
        remove(index)
    }

    return (
        <>
            <InputGroup>
                <InputGroup.Text>{props?.text}</InputGroup.Text>
                <FormControl />
                <Button variant="danger" onClick={handleRemove}>remove</Button>
            </InputGroup>

        </>
    )

}


export default FilterWidgetBetween