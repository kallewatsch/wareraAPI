import React from "react"

import boots from "../../imgs/boots.png"
import case1 from "../../imgs/case1.png"
import chest from "../../imgs/chest.png"
import gloves from "../../imgs/gloves.png"
import gun from "../../imgs/gun.png"
import helmet from "../../imgs/helmet.png"
import jet from "../../imgs/jet.png"
import knife from "../../imgs/knife.png"
import pants from "../../imgs/pants.png"
import rifle from "../../imgs/rifle.png"
import sniper from "../../imgs/sniper.png"
import tank from "../../imgs/tank.png"
import ammo from "../../imgs/lightAmmo.png"
import { Image, ListGroup, ListGroupItem } from "react-bootstrap"


export const getEquipmentItem = (equipmentType, rarity) => {
    //const rarity = equipmentType == "ammo" ? getAmmoRarity(equipmentValue) : getEquipmentRarity(equipmentValue)
    const imgs = getEquipmentImage(equipmentType, rarity)
    return imgs.map(img => ({ img, rarity }))
}

export const getEquipmentImage = (equipmentType, equipmentRarity) => {
    if (equipmentRarity == "none") {
        return [case1]
    }
    switch (equipmentType) {
        /* case "attack":
            return case1 */
        case "armor":
            return [chest, pants]
        case "criticalChance":
            return [getWeapon(equipmentRarity)]
        case "criticalDamages":
            return [helmet]
        case "dodge":
            return [boots]
        case "precision":
            return [gloves]
        default:
            return [ammo]
    }
}

export const getWeapon = (val) => {
    switch (val) {
        case "mythic":
            return jet
        case "legendary":
            return tank
        case "epic":
            return sniper
        case "rare":
            return rifle
        case "uncommon":
            return gun
        case "common":
            return knife
        default:
            return case1
    }
}

export const getEquipmentRarity = (_equipmentValue, equipmentType) => {
    // criticalDamages has double the values
    const equipmentValue = ["criticalDamages", "armor"].includes(equipmentType) ? _equipmentValue / 2 : _equipmentValue
    switch (true) {
        case equipmentValue >= 31:
            return "mythic"
        case equipmentValue >= 21:
            return "legendary"
        case equipmentValue >= 16:
            return "epic"
        case equipmentValue >= 11:
            return "rare"
        case equipmentValue >= 6:
            return "uncommon"
        case equipmentValue >= 1:
            return "common"
        default:
            return "none"
    }
}

export const getAmmoRarity = (ammoPercent) => {
    switch (ammoPercent) {
        case 40:
            return "epic"
        case 20:
            return "rare"
        case 10:
            return "uncommon"
        default:
            return "common"
    }
}

export const UserEquipment = (props) => {

    const {
        attack,
        armor,
        dodge,
        precision,
        criticalChance,
        criticalDamages
    } = props

    const bla = {
        attack,
        armor,
        dodge,
        precision,
        criticalChance,
        criticalDamages
    }

    const order = ["criticalChance", "attack", "criticalDamages", "armor", "dodge", "precision"]

    const equipmentItems = Object.keys(bla).sort((a, b) => order.indexOf(a) - order.indexOf(b)).map((key) => {
        const item = bla[key]
        const itemRarity = key == "attack" ? getAmmoRarity(item?.ammoPercent) : getEquipmentRarity(item?.weapon || item?.equipment, key)
        const equipmentItem = getEquipmentItem(key, itemRarity)
        return equipmentItem.flat()
    }).flat()

    return (
        <>
            {equipmentItems &&
                <ListGroup horizontal className="user-equipment">
                    {equipmentItems.map((item, i) => (
                        <ListGroupItem key={i}>
                            <Image  rounded src={item?.img} className={item?.rarity}/>
                        </ListGroupItem>
                    ))}
                </ListGroup>}
        </>
    )

}


export default UserEquipment