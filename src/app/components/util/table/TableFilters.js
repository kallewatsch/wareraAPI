import React, { useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import TableFilterItem from "./TableFilterItem"
import FilterWidgetSingleValue from "./FilterWidgetSingleValue"
import FilterWidgetBetween from "./FilterWidgetBetween"

export const SearchResultDefault = props => {
    return <h1>default</h1>
}

const getComponent = (s) => {
    switch (s) {
        case "equal":
        case "smaller":
        case "smallerEqual":
        case "bigger":
        case "biggerEqual":
        case "includes":
            return FilterWidgetSingleValue
        case "between":
            return FilterWidgetBetween
        default:
            return SearchResultDefault
    }
}


export const TableFilters = (props) => {

    const { ths, applyFilters } = props

    const [showModal, setShowModal] = useState(false)
    const [filterWidgets, setFilterWidgets] = useState([])

    const filters = [
        { name: 'equal' },
        { name: 'smaller' },
        { name: 'smallerEqual' },
        { name: 'bigger' },
        { name: 'biggerEqual' },
        { name: 'includes' },
        /* { name: 'between' }, */
    ]

    const handleClick = event => {
        setShowModal(true)
    }

    const handleClose = event => {
        setShowModal(false)
    }

    const handleRemoveWidget = (index) => {
        const foo = [...filterWidgets]
        foo.splice(index, 1)
        setFilterWidgets(foo)
    }

    const handleAddWidget = (th, filter) => {
        const text = `${th} ${filter}`
        const widget = { text, th, filter, value: '' }
        setFilterWidgets([...filterWidgets, widget])
        setShowModal(false)
    }

    const handleChangeWidgetValue = (value, index) => {
        const widget = Object.assign({}, { ...filterWidgets[index] }, { value })
        const foo = [...filterWidgets]
        foo.splice(index, 1, widget)
        setFilterWidgets(foo)
    }

    const handleApplyFilters = event => {
        applyFilters(filterWidgets)
    }

    return (
        <>
            <Row>
                <Button onClick={handleClick}>Add Filter</Button>
            </Row>
            <hr />
            <Row>
                {filterWidgets.map((widget, i) => {
                    const Comp = getComponent(widget?.filter)
                    const widgetProps = {
                        ...widget,
                        remove: handleRemoveWidget,
                        changeWidgetValue: handleChangeWidgetValue,
                        value: '',
                        index: i,
                        hasFocus: i == filterWidgets.length - 1
                    }
                    return <Comp {...widgetProps} key={i} />
                })}
                <Button onClick={handleApplyFilters} disabled={filterWidgets.some(x => !x.value.length)}>Apply Filters</Button>
            </Row>

            <Modal show={showModal} onHide={handleClose} fullscreen>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <TableFilterItem ths={ths} filters={filters} addFilter={handleAddWidget} />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )

}


export default TableFilters