import React, { useState } from "react"
import { IconContext } from "react-icons"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal"
import TableHeader from "./TableHeader"
import Alert from "react-bootstrap/Alert"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import TableRow from "./TableRow"
import Country from "../../country/Country"
import Mu from "../../mu/Mu"
import Party from "../../party/Party"
import Region from "../../region/Region"
import User from "../../user/User"
import TableFilters from "./TableFilters"
import { sortByFoo, getObjKeyViaAttrPath } from "../../../utils/fooStuff"
import "./SortableTable.css"


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


export const SortableTableWithTabs = (props) => {

    const { items, tabs: _tabs, component } = props
    const [sortedItems, setSortedItems] = useState(items)
    const [showModal, setShowModal] = useState(false)
    const [tabKey, setTabKey] = useState()
    const [filters, setFilters] = useState([])
    const [modalCompProps, setModalCompProps] = useState()

    const tabs = _tabs.map(tab => {
        return {
            name: tab.name,
            ths: tab.ths.map(th => {
                const id = [...th.attrPath, th.target].join(".")
                return { ...th, id }
            })
        }
    })

    const handleClose = event => {
        setShowModal(false)
    }

    const handleShowItemModal = item => {
        setModalCompProps(item)
        setShowModal(true)
    }

    const handleSortTable = (event, attrPath, key) => {
        const _sortedItems = sortByFoo(items, attrPath, key)
        if (sortedItems.every((item, i) => _sortedItems[i] && item._id == _sortedItems[i]._id)) {
            setSortedItems(_sortedItems.reverse())
        }
        else {
            setSortedItems(_sortedItems)
        }
    }

    const handleApplyFilters = (filters) => {
        setFilters(filters)
    }

    const formatValue = (value, decimals = 2) => {
        // hallelujah
        if (typeof value === 'string' || value instanceof String) {
            if (value.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{0,}Z/)) {
                return value
            }
        }
        return isNaN(parseFloat(value)) ? value : parseFloat(parseFloat(value).toFixed(decimals))
    }

    const tableFilterThs = tabs.map(tab => tab.ths).flat()

    // TODO: name probably not the right thing to determine uniqueness?
    const map = new Map(tableFilterThs.map(pos => [pos.id, pos]));
    const tableFilterThsUnique = [...map.values()];

    let filteredItems = sortedItems

    for (let filter of filters) {
        const { th, value, filter: condition } = filter
        let checkCondition
        const _th = tabs.map(tab => tab.ths).flat().find(x => x.id == th)
        const { attrPath, target } = _th

        switch (condition) {
            case "biggerEqual":
                checkCondition = (item, attrPath, target) => formatValue(getObjKeyViaAttrPath(item, attrPath, target)) >= formatValue(value)
                break;
            case "bigger":
                checkCondition = (item, attrPath, target) => formatValue(getObjKeyViaAttrPath(item, attrPath, target)) > formatValue(value)
                break;
            case "smallerEqual":
                checkCondition = (item, attrPath, target) => formatValue(getObjKeyViaAttrPath(item, attrPath, target)) <= formatValue(value)
                break;
            case "smaller":
                checkCondition = (item, attrPath, target) => formatValue(getObjKeyViaAttrPath(item, attrPath, target)) < formatValue(value)
                break;
            case "equal":
                checkCondition = (item, attrPath, target) => formatValue(getObjKeyViaAttrPath(item, attrPath, target)) == formatValue(value)
                break;
            case "includes":
                checkCondition = (item, attrPath, target) => `${formatValue(getObjKeyViaAttrPath(item, attrPath, target))}`.includes(formatValue(value))
                break;
            default:
                checkCondition = () => true
        }
        filteredItems = filteredItems.filter(item => {
            return checkCondition(item, attrPath, target)
        })
    }

    const filteredItems1000 = [...filteredItems].slice(0,1000)

    const Comp = getComponent(component)
    const decimals = 2

    return (
        <IconContext.Provider value={{ size: "3em", className: "icon-gray" }}>
            <Row>
                <Col>
                    <Alert>
                        <h5><i>Bedienungsanleitung</i></h5>
                        <ul>
                            <li>Tableheaders klicken zum sortieren</li>
                            <li>Mit Add Filter hinzufügen und Wert eintragen</li>
                            <li>Apply Filter wendet alle filter an</li>
                        </ul>
                    </Alert>
                </Col>
                <Col>
                    <Alert variant="warning">
                        <h5><i>bezüglich UI</i></h5>
                        <ul>
                            <li>hier ändert sich zuviel zu schnell</li>
                            <li>kommt irgendwann was besseres</li>
                            <li>Vorschläge, Anregungen, Kritik willkommen</li>
                        </ul>
                    </Alert>
                </Col>
            </Row>
            <Row className="sortableTable-container">
                <TableFilters items={[...items]} ths={tableFilterThsUnique} applyFilters={handleApplyFilters} decimals={decimals} />

                <h6>Showing {filteredItems1000.length} out of {filteredItems.length} filtered items. unfiltered:  {sortedItems.length}</h6>
                <Tabs
                    activeKey={tabKey}
                    defaultActiveKey={0}
                    onSelect={(k) => setTabKey(k)}
                    className="mb-3"
                    justify
                >
                    {tabs && tabs.map((tab, i) =>
                        <Tab eventKey={i} title={tab.name} key={`${i}`}>
                            <Table className="sortableTable">
                                <TableHeader ths={tab.ths} sortItems={handleSortTable} />
                                <tbody>
                                    {filteredItems1000.map((item, i) => <TableRow key={i} item={item} tds={tab.ths} openModal={handleShowItemModal} decimals={decimals} />)}
                                </tbody>
                            </Table>
                        </Tab>
                    )}

                </Tabs>

                <Modal show={showModal} onHide={handleClose} fullscreen>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <Comp {...modalCompProps} />
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </Row>
        </IconContext.Provider>
    )

}


export default SortableTableWithTabs