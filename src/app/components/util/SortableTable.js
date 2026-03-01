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

    const meh = sortedItems.length ? sortedItems : items

    const Comp = getComponent(component)

    return (
        <Row className="sortableTable-container">

            <h6>{items.length} Items</h6>

            <b>TODO: add interface for all the filtering stuff.</b>

            <Table className="sortableTable">
                <TableHeader items={items} ths={ths} sortItems={handleSortTable} />
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