import React from "react"
import { useSelector, useDispatch } from "react-redux"
import FormControl from "react-bootstrap/FormControl"
import FormSelect from "react-bootstrap/FormSelect"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import InputGroup from "react-bootstrap/InputGroup"
import Image from "react-bootstrap/Image"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import {
    GiBroadsword,
    GiCrosshair,
    GiHeadshot,
    GiHelmetHeadShot,
    GiLoveMystery,
    GiRunningNinja,
    GiShield
} from "react-icons/gi"
import {
    setEquipmentItem,
    setEquipmentItemValue
} from "../../slices/skillbuildSlice"
import { equipmentItemValues } from "./config"
import IconWithPopoverOverlay from "../util/IconWithPopoverOverlay"


export const EquipmentItem = (props) => {

    const { name, imgSrc, item: equipmentItem, icon: Icon } = props
    const { rareness, values } = equipmentItem

    const dispatch = useDispatch()

    const options = [
        "mythic", "legendary", "epic", "rare", "uncommon", "common", "noItem"
    ].map((x, i) => <option key={i} value={x}>{x}</option>)

    const handleChangeRareness = event => {
        const { target: { value } } = event
        const values = equipmentItemValues[name][value]
        dispatch(setEquipmentItem({ name, rareness: value, values }))
    }

    const valueIcons = {
        attack: GiBroadsword,
        criticalChance: GiHeadshot,
        criticalDamages: GiHelmetHeadShot,
        armor: GiShield,
        precision: GiCrosshair,
        dodge: GiRunningNinja,
        modifier: GiLoveMystery
    }

    const handleChangeItemValue = (event, key) => {
        const { target: { value } } = event
        dispatch(setEquipmentItemValue({ name, key, value }))
    }

    return (
        <Row>
            <Col>
                <ListGroup horizontal>
                    <ListGroupItem>
                        <Image src={imgSrc} className={rareness} thumbnail />
                    </ListGroupItem>
                    <ListGroupItem>
                        <Icon size="3em" />
                    </ListGroupItem>
                    <ListGroupItem>
                        <FormSelect size="sm" value={rareness} onChange={handleChangeRareness} className="item-select">
                            {options}
                        </FormSelect>
                    </ListGroupItem>
                    {values && Object.keys(values).map((key, i) => {
                        const val = values[key]
                        const ValueIcon = valueIcons[key]
                        return (
                            <ListGroupItem key={i}>
                                <InputGroup >
                                    <InputGroup.Text>
                                        <IconWithPopoverOverlay title={key}>
                                            <ValueIcon size="1.5em" />
                                        </IconWithPopoverOverlay>
                                    </InputGroup.Text>
                                    <FormControl size="sm" key={i} value={val} onChange={(event) => handleChangeItemValue(event, key)} type="number" />
                                </InputGroup>
                            </ListGroupItem>

                        )
                    })}
                </ListGroup>
            </Col>
        </Row>
    )

}


export default EquipmentItem