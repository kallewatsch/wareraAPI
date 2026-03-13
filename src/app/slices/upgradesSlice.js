import { createSlice } from '@reduxjs/toolkit'
//import initialStateUpgrades from "../../mocks/states/initialStateUpgrades.json"

export const initialState = []

export const upgradesSlice = createSlice({
    name: 'upgrades',
    initialState,
    reducers: {
        setUpgrades(state, action) {
            return action.payload
        }
    }
})

export default upgradesSlice.reducer