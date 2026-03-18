import { createSlice } from '@reduxjs/toolkit'

export const initialStateSkills = {
    health: 0,
    hunger: 0,
    armor: 0,
    dodge: 0,
    precision: 0,
    criticalChance: 0,
    attack: 0,
    criticalDamages: 0,
    //lootChance: 0
}

export const initialStateEquipment = {
    weapon: { rareness: "common", values: { attack: 40, criticalChance: 5 } },
    ammo: { rareness: "uncommon", values: { modifier: 5 } },
    helmet: { rareness: "common", values: { criticalDamages: 10 } },
    chest: { rareness: "common", values: { armor: 5 } },
    pants: { rareness: "common", values: { armor: 5 } },
    gloves: { rareness: "common", values: { precision: 5 } },
    boots: { rareness: "common", values: { dodge: 5 } }
}

export const initialStateFood = {
    bread: 0,
    steak: 0,
    fish: 0
}

export const initialStateFoodSimple = "noFood"

export const initialState = {
    skills: initialStateSkills,
    equipment: initialStateEquipment,
    food: initialStateFoodSimple
}

export const skillbuildSlice = createSlice({
    name: 'skillbuild',
    initialState,
    reducers: {
        resetAll(state, action) {
            return initialState
        },
        resetSkills(state, action) {
            return { ...state, skills: initialStateSkills }
        },
        resetEquipment(state, action) {
            return { ...state, equipment: initialStateEquipment }
        },
        resetFood(state, action) {
            return { ...state, food: initialStateFood }
        },
        setSkill(state, action) {
            const { name, value } = action.payload
            const _skills = Object.assign({}, { ...state.skills }, { [name]: value })
            return {
                ...state,
                skills: _skills
            }
        },
        setEquipment(state, action) {
            return {
                ...state,
                equipment: action.payload
            }
        },
        setEquipmentItem(state, action) {
            const { name, rareness, values } = action.payload
            const _equipment = Object.assign({}, { ...state.equipment }, { [name]: { values, rareness } })
            return {
                ...state,
                equipment: _equipment
            }
        },
        setEquipmentItemValue(state, action) {
            const { name, key, value } = action.payload
            const _values = Object.assign({}, { ...state.equipment[name].values }, { [key]: parseInt(value) })
            const _equipmentItem = Object.assign({}, { ...state.equipment[name] }, { values: _values })
            const _equipment = Object.assign({}, { ...state.equipment }, { [name]: _equipmentItem })
            return {
                ...state,
                equipment: _equipment
            }
        },
        setFood(state,  action) {
            return {
                ...state,
                food: action.payload
            }
        }
    }
})



export default skillbuildSlice.reducer