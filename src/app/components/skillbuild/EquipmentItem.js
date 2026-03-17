import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FormControl, FormSelect, Row, Col, InputGroup, Image } from "react-bootstrap"
import IconWithPopoverOverlay from "../util/IconWithPopoverOverlay"
import { GiBroadsword, GiCrosshair, GiHeadshot, GiHelmetHeadShot, GiLoveMystery, GiRunningNinja, GiShield } from "react-icons/gi"
import { setEquipmentItem, setEquipmentItemValue } from "../../appSlice"
import { equipmentItemValues } from "./Equipment"


/* export const getDefaultValues = (name, rareness) => {

} */

export const EquipmentItem = (props) => {

    //const [rareness, setRareness] = useState('')
    const { name, imgSrc } = props

    const { equipment } = useSelector(state => state.app.skillbuild)
    const equipmentItem = equipment[name]

    const { rareness, values } = equipmentItem

    const dispatch = useDispatch()

    const options = [
        "mythic", "legendary", "epic", "rare", "uncommon", "common"
    ].map((x, i) => <option key={i} value={x}>{x}</option>)

    const handleChangeRareness = event => {
        const { target: { value } } = event
        const values = equipmentItemValues[name][value]
        dispatch(setEquipmentItem({ name, rareness: value, values }))
    }

    const inputs = equipment[name]?.values

    const icons = {
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
        <>
            <Row>
                <Col>
                    <FormSelect value={rareness} onChange={handleChangeRareness}>
                        {options}
                    </FormSelect>
                </Col>
            </Row>
            <Row>
                <Col lg={2}>
                    <Image src={imgSrc} className={rareness} thumbnail />
                </Col>
                <Col lg={10}>
                    {inputs && Object.keys(inputs).map((key, i) => {
                        const val = inputs[key]
                        const Icon = icons[key]
                        return (
                            <InputGroup key={i}>
                                <InputGroup.Text>
                                    <IconWithPopoverOverlay title={key}>
                                        <Icon size="2em" />
                                    </IconWithPopoverOverlay>
                                </InputGroup.Text>
                                <FormControl key={i} value={val} onChange={(event) => handleChangeItemValue(event, key)} type="number" />
                            </InputGroup>
                        )
                    })}
                </Col>
            </Row>

        </>
    )

}


export default EquipmentItem