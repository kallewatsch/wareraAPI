import React from "react"
import { useDispatch, useSelector } from "react-redux"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import EquipmentItem from "./EquipmentItem"
import imgs from "../../imgs"
import { FormSelect } from "react-bootstrap"
import { setEquipment } from "../../appSlice"


export const equipmentItemValues = {
    weapon: {
        mythic: { attack: 280, criticalChance: 40 },
        legendary: { attack: 160, criticalChance: 30 },
        epic: { attack: 120, criticalChance: 20 },
        rare: { attack: 90, criticalChance: 15 },
        uncommon: { attack: 60, criticalChance: 10 },
        common: { attack: 40, criticalChance: 5 }
    },
    helmet: {
        mythic: { criticalDamages: 80 },
        legendary: { criticalDamages: 60 },
        epic: { criticalDamages: 40 },
        rare: { criticalDamages: 30 },
        uncommon: { criticalDamages: 20 },
        common: { criticalDamages: 10 }
    },
    chest: {
        mythic: { armor: 40 },
        legendary: { armor: 30 },
        epic: { armor: 20 },
        rare: { armor: 15 },
        uncommon: { armor: 10 },
        common: { armor: 5 }
    },
    pants: {
        mythic: { armor: 40 },
        legendary: { armor: 30 },
        epic: { armor: 20 },
        rare: { armor: 15 },
        uncommon: { armor: 10 },
        common: { armor: 5 }
    },
    gloves: {
        mythic: { precision: 40 },
        legendary: { precision: 30 },
        epic: { precision: 20 },
        rare: { precision: 15 },
        uncommon: { precision: 10 },
        common: { precision: 5 }
    },
    boots: {
        mythic: { dodge: 40 },
        legendary: { dodge: 30 },
        epic: { dodge: 20 },
        rare: { dodge: 15 },
        uncommon: { dodge: 10 },
        common: { dodge: 5 }
    }
}

const imgSrcWeapons = {
    mythic: imgs.imgJet,
    legendary: imgs.imgTank,
    epic: imgs.imgSniper,
    rare: imgs.imgRifle,
    uncommon: imgs.imgGun,
    common: imgs.imgKnife
}

export const Equipment = (props) => {

    const { equipment } = useSelector(state => state.app.skillbuild)

    const dispatch = useDispatch()

    const imgSrcWeapon = equipment.weapon.rareness

    const items = [
        { name: "weapon", imgSrc: imgSrcWeapons[imgSrcWeapon] },
        /* { name: "ammo", imgSrc: imgs.imgLightAmmo }, */
        { name: "helmet", imgSrc: imgs.imgHelmet },
        { name: "chest", imgSrc: imgs.imgChest },
        { name: "pants", imgSrc: imgs.imgPants },
        { name: "gloves", imgSrc: imgs.imgGloves },
        { name: "boots", imgSrc: imgs.imgBoots }
    ]

    const rarenessArr = ["mythic", "legendary", "epic", "rare", "uncommon", "common"]

    const handleChange = event => {
        const { target: { value } } = event
        const items = Object.keys(equipmentItemValues).map((key, i) => {
            return [key, { values: equipmentItemValues[key][value], rareness: value }]
        })
        const baz = Object.fromEntries(items)
        dispatch(setEquipment(baz))
    }

    return (
        <ListGroup className="skillbuild-equipment">
            <FormSelect onChange={handleChange}>
                {rarenessArr.map((x, i) => <option key={i} value={x}>{x}</option>)}
            </FormSelect>
            {items.map((item, i) => <ListGroupItem key={i}><EquipmentItem {...item} /></ListGroupItem>)}
        </ListGroup>
    )
}


export default Equipment