import React, { useState } from "react"
import Row from "react-bootstrap/Row"
import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal"
import TableHeader from "./TableHeader"
import TableRow from "./TableRow"
import Country from "../country/Country"
import Mu from "../mu/Mu"
import Party from "../party/Party"
import Region from "../region/Region"
import User from "../user/User"
import "./SortableTable.css"
import TableFilters from "./TableFilters"
import { sortByFoo, getObjKeyViaAttrPath } from "../../utils/fooStuff"


export const ResultDefault = props => {
    return <h1>default</h1>
}

const getComponent = (s) => {
    switch (s) {
        case "country":
            return Country
        case "mu":
            return Mu
        case "party":
            return Party
        case "region":
            return Region
        case "user":
            return User
        default:
            return ResultDefault
    }
}


export const SortableTable = (props) => {

    const { items, ths, component } = props
    const [sortedItems, setSortedItems] = useState(items)
    const [showModal, setShowModal] = useState(false)
    const [filters, setFilters] = useState([])
    const [modalCompProps, setModalCompProps] = useState()

    const handleClose = event => {
        setShowModal(false)
    }

    const handleShowItemModal = item => {
        setModalCompProps(item)
        setShowModal(true)
    }

    const handleSortTable = (event, attrPath, key) => {
        const sortedFucks = sortByFoo(items, attrPath, key)
        if (sortedItems.every((item, i) => sortedFucks[i] && item._id == sortedFucks[i]._id)) {
            setSortedItems(sortedFucks.reverse())
        }
        else {
            setSortedItems(sortedFucks)
        }
    }

    const handleApplyFilters = (filters) => {
        setFilters(filters)
    }

    const fuckThisShit = value => {
        return isNaN(parseFloat(value)) ? value : parseFloat(value)
    }

    let meh = sortedItems

    for (let filter of filters) {
        const { th, value, filter: condition } = filter
        let checkCondition
        const _th = ths.find(x => x.txt == th)
        const { attrPath, target } = _th
        switch (condition) {
            case "bigger":
                checkCondition = (item, attrPath, target) => getObjKeyViaAttrPath(item, attrPath, target) >= fuckThisShit(value)
                break;
            case "smaller":
                checkCondition = (item, attrPath, target) => getObjKeyViaAttrPath(item, attrPath, target) <= fuckThisShit(value)
                break;
            case "equal":
                checkCondition = (item, attrPath, target) => getObjKeyViaAttrPath(item, attrPath, target) == fuckThisShit(value)
                break;
            default:
                checkCondition = () => true
        }
        meh = meh.filter(item => {
            return checkCondition(item, attrPath, target)
        })
    }

    const Comp = getComponent(component)

    return (
        <Row className="sortableTable-container">
            <TableFilters items={[...items]} ths={ths} applyFilters={handleApplyFilters} />
            <Table className="sortableTable">
                <TableHeader ths={ths} sortItems={handleSortTable} />
                <tbody>
                    {meh.map((item, i) => <TableRow key={i} item={item} tds={ths} bla={handleShowItemModal} />)}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose} fullscreen>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Comp {...modalCompProps} />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </Row>
    )

}


export default SortableTable