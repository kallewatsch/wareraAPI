import React, { useState } from "react"
import { getObjKeyViaAttrPath } from "../../utils/fooStuff"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import TableFilterItem from "./TableFilterItem"
import FilterWidgetBigger from "./FilterWidgetBigger"
import FilterWidgetSmaller from "./FilterWidgetSmaller"
import FilterWidgetEqual from "./FilterWidgetEqual"
import FilterWidgetIncludes from "./FilterWidgetIncludes"
import FilterWidgetBetween from "./FilterWidgetBetween"

export const SearchResultDefault = props => {
    return <h1>default</h1>
}

const getComponent = (s) => {
    switch (s) {
        case "bigger":
            return FilterWidgetBigger
        case "smaller":
            return FilterWidgetSmaller
        case "between":
            return FilterWidgetBetween
        case "equal":
            return FilterWidgetEqual
        case "includes":
            return FilterWidgetIncludes
        default:
            return SearchResultDefault
    }
}


export const TableFilters = (props) => {

    const { items, ths, applyFilters } = props

    const [showModal, setShowModal] = useState(false)
    const [filterWidgets, setFilterWidgets] = useState([])

    const filters = [
        { name: 'bigger' },
        { name: 'smaller' },
        /* { name: 'between' }, */
        { name: 'equal' },
        /* { name: 'includes' } */
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

            <Button onClick={handleClick}>Add Filter</Button>
            <Row>
                {filterWidgets.map((widget, i) => {
                    const Comp = getComponent(widget?.filter)
                    const widgetProps = {
                        ...widget,
                        remove: handleRemoveWidget,
                        changeWidgetValue: handleChangeWidgetValue,
                        value: '',
                        index: i
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