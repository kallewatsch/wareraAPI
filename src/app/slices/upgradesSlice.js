import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { endpoints } from '../api'
//import initialStateUpgrades from "../../mocks/states/initialStateUpgrades.json"

export const initialState = []

export const getUpgrades = createAsyncThunk("upgrades/getUpgrades", async ({ regionIds }, thunkApi) => {
    try {

        let allUpgrades = []

        const ep = 'upgrade.getUpgradeByTypeAndEntity'
        while (regionIds.length) {

            const chunk = regionIds.splice(0, 400)

            const obj1 = Object.fromEntries(chunk.map((id, i) => [i, { regionId: id, upgradeType: "bunker" }]))
            const obj2 = Object.fromEntries(chunk.map((id, i) => [i, { regionId: id, upgradeType: "base" }]))
            const obj3 = Object.fromEntries(chunk.map((id, i) => [i, { regionId: id, upgradeType: "pacificationCenter" }]))
            const payload1 = {
                endpoints: chunk.map(item => ep),
                obj: obj1
            }
            const payload2 = {
                endpoints: chunk.map(item => ep),
                obj: obj2
            }
            const payload3 = {
                endpoints: chunk.map(item => ep),
                obj: obj3
            }
            const bunkersResult = await thunkApi.dispatch(endpoints.getAnythingBatchedPost.initiate(payload1)).unwrap()
            const basesResult = await thunkApi.dispatch(endpoints.getAnythingBatchedPost.initiate(payload2)).unwrap()
            const pacificationCentersResult = await thunkApi.dispatch(endpoints.getAnythingBatchedPost.initiate(payload3)).unwrap()

            allUpgrades = [...allUpgrades, ...bunkersResult, ...basesResult, ...pacificationCentersResult]
        }
        const allUpgradesFlat = allUpgrades.flat()
        return Promise.resolve(allUpgradesFlat)
    } catch (err) {
        console.log("OH NO", err)
        //return Promise.reject()
    }
})

export const upgradesSlice = createSlice({
    name: 'upgrades',
    initialState,
    reducers: {
        setUpgrades(state, action) {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUpgrades.fulfilled, (state, action) => {
                console.log(action)
                return action.payload
            })
    }
})

export const {
    setUpgrades
} = upgradesSlice.actions

export default upgradesSlice.reducer