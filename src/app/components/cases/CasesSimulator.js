import React, { useState } from "react"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import "./CasesSimulator.css"
import boots from "./imgs/boots.png"
import case1 from "./imgs/case1.png"
import chest from "./imgs/chest.png"
import gloves from "./imgs/gloves.png"
import gun from "./imgs/gun.png"
import helmet from "./imgs/helmet.png"
import jet from "./imgs/jet.png"
import knife from "./imgs/knife.png"
import pants from "./imgs/pants.png"
import rifle from "./imgs/rifle.png"
import sniper from "./imgs/sniper.png"
import tank from "./imgs/tank.png"
/* 

Tier 1 / Common / Grey	62%
Tier 2 / Uncommon / Green	30%
Tier 3 / Rare / Blue	7,1%
Tier 4 / Epic / Purple	0,85%
Tier 5 / Legendary / Yellow	0,04%
Tier 6 / Mythic / Red	0,01% => 99.99

*/
const imagesObj = {
    boots, case1, chest, gloves, gun, helmet, jet, knife, pants, rifle, sniper, tank
}


export const openCase = () => {

    const rnd1 = Math.random()
    const rnd2 = Math.random()
    let rareness, itemType

    switch (true) {
        case rnd1 >= 0.9999:
            rareness = "mythic"
            break;
        case rnd1 >= 0.9996:
            rareness = "legendary"
            break;
        case rnd1 >= 0.9915:
            rareness = "epic"
            break;
        case rnd1 >= 0.929:
            rareness = "rare"
            break;
        case rnd1 >= 0.7:
            rareness = "uncommon"
            break;
        default:
            rareness = "common"
    }

    switch (true) {
        case rnd2 >= 0.7:
            itemType = "weapon"
            break;
        case rnd2 >= 0.56:
            itemType = "helmet"
            break;
        case rnd2 >= 0.42:
            itemType = "boots"
            break;
        case rnd2 >= 0.28:
            itemType = "chest"
            break;
        case rnd2 >= 0.14:
            itemType = "pants"
            break;
        default:
            itemType = "gloves"
    }

    return [rareness, itemType]
}

export const weaponTypes = {
    "mythic": "jet",
    "legendary": "tank",
    "epic": "sniper",
    "rare": "rifle",
    "uncommon": "gun",
    "common": "knife"
}

export const calcTotalForDataProps = (data, props) => {
    // thank you stackoverflow
    return data.reduce((r, o) => Object
        .fromEntries(props.map(k => [k, (r[k] || 0) + o[k]])
        ), {});
}

export const CasesSimulator = (props) => {

    const { caseCount } = props

    const [images, setImages] = useState(Array.from({ length: caseCount }).map(() => ({ name: 'case1', rareness: 'dunno' })))
    const [counter, setCounter] = useState({ mythic: 0, legendary: 0, epic: 0, rare: 0, uncommon: 0, common: 0 })

    const handleReset = event => {
        setImages(Array.from({ length: caseCount }).map(() => ({ name: 'case1', rareness: 'dunno' })))
    }

    const handleOpenAll = event => {
        const newImages = []
        let counts = { mythic: 0, legendary: 0, epic: 0, rare: 0, uncommon: 0, common: 0 }
        for (let i = 0; i < caseCount; i++) {
            const [rareness, itemType] = openCase()
            counts[rareness]++
            const name = itemType != "weapon" ? itemType : weaponTypes[rareness]
            newImages.push({ name, rareness })
        }
        const meh = Object.assign({}, { ...counter })
        const fuck = [meh, counts]
        const foo = calcTotalForDataProps(fuck, Object.keys(weaponTypes))
        setCounter(foo)
        setImages(newImages)
    }

    const handleClick = index => {
        const [rareness, itemType] = openCase()
        const name = itemType != "weapon" ? itemType : weaponTypes[rareness]
        const newImages = [...images]
        newImages.splice(index, 1, { name, rareness })
        const meh = Object.assign({}, { ...counter })
        const bla = Object.assign({}, { mythic: 0, legendary: 0, epic: 0, rare: 0, uncommon: 0, common: 0 }, { [rareness]: 1 })
        const fuck = [meh, bla]
        const foo = calcTotalForDataProps(fuck, Object.keys(weaponTypes))
        setCounter(foo)
        setImages(newImages)
    }

    const foo = Array.from({ length: caseCount }).map((_, i) => {
        const src = imagesObj[images[i].name]
        return <img key={i} alt={images[i].name} onClick={() => handleClick(i)}
            src={src} className={images[i].rareness} />
    })

    const total = Object.keys(counter).map(key => counter[key]).reduce((acc, sum) => acc + sum, 0)

    return (
        <div>
            <InputGroup>
                <Button onClick={handleReset} >reset</Button>
                <Button onClick={handleOpenAll} >open all</Button>
                <Form.Control className="total" disabled value={`total: ${total}`} />
                {Object.keys(counter).map((key, i) => <Form.Control className={key} key={i} disabled value={`${key}: ${counter[key]}`} />)}
            </InputGroup>

            <div className="casesContainer">
                {foo}
            </div>
        </div>

    )

}


export default CasesSimulator