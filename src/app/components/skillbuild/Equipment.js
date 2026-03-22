import React from "react"
import { useDispatch, useSelector } from "react-redux"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import EquipmentItem from "./EquipmentItem"
import imgs from "../../imgs"
import { FormSelect } from "react-bootstrap"
import { setEquipment } from "../../slices/skillbuildSlice"
import { equipmentItemValues, imgSrcWeapons } from "./config"
import { GiBoots, GiChestArmor, GiGloves, GiMp5K, GiStahlhelm, GiTrousers } from "react-icons/gi"


export const Equipment = (props) => {

    const { equipment } = useSelector(state => state.app.skillbuild)

    const dispatch = useDispatch()

    const imgSrcWeapon = equipment.weapon.rareness

    const items = [
        {
            name: "weapon",
            imgSrc: imgSrcWeapons[imgSrcWeapon],
            item: equipment.weapon,
            icon: GiMp5K
        },
        {
            name: "helmet",
            imgSrc: imgs.imgHelmet,
            item: equipment.helmet,
            icon: GiStahlhelm
        },
        {
            name: "chest",
            imgSrc: imgs.imgChest,
            item: equipment.chest,
            icon: GiChestArmor
        },
        {
            name: "pants",
            imgSrc: imgs.imgPants,
            item: equipment.pants,
            icon: GiTrousers
        },
        {
            name: "gloves",
            imgSrc: imgs.imgGloves,
            item: equipment.gloves,
            icon: GiGloves
        },
        {
            name: "boots",
            imgSrc: imgs.imgBoots,
            item: equipment.boots,
            icon: GiBoots
        }
    ]

    const rarenessArr = ["noItem", "mythic", "legendary", "epic", "rare", "uncommon", "common"]

    const handleChange = event => {
        const { target: { value } } = event
        const items = Object.keys(equipmentItemValues).map((key, i) => {
            return [key, { values: equipmentItemValues[key][value], rareness: value }]
        })
        const _equipment = Object.fromEntries(items)
        dispatch(setEquipment(_equipment))
    }

    return (
        <ListGroup className="skillbuild-equipment">
            <ListGroupItem>
                <FormSelect onChange={handleChange}>
                    {rarenessArr.map((x, i) => <option key={i} value={x}>{x}</option>)}
                </FormSelect>
            </ListGroupItem>
            {items.map((item, i) => <ListGroupItem key={i}><EquipmentItem {...item} /></ListGroupItem>)}
        </ListGroup>
    )
}


export default Equipment