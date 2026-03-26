import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { endpoints } from '../api'

export const initialState = {}

export const getRegions = createAsyncThunk("regions/getRegions", async (_, thunkAPI) => {
    try {
        const { result: { data: regions } } = await thunkAPI.dispatch(endpoints.getRegions.initiate()).unwrap()
        return Promise.resolve(regions)
    } catch (err) {
        console.log("OH NO", err)
        //return Promise.reject()
    }
})

export const regionsSlice = createSlice({
    name: 'regions',
    initialState,
    reducers: {
        setRegions(state, action) {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRegions.fulfilled, (state, action) => {
                return action.payload
            })
    },
    selectors: {
        selectCountryCurrentRegions: createSelector(
            [
                state => Object.keys(state)
                    .map((key, i) => state[key]),
                (state, countryId) => countryId
            ],
            (regions, countryId) => regions
                .filter(region => region.country === countryId)
        ),
        selectCountryInitialRegions: createSelector(
            [
                state => Object.keys(state)
                    .map((key, i) => state[key]),
                (state, countryId) => countryId
            ],
            (regions, countryId) => regions
                .filter(region => region.initialCountry === countryId)
        ),
    }
})

export const {
    setRegions
} = regionsSlice.actions

export const {
    selectCountryCurrentRegions,
    selectCountryInitialRegions,
    selectFuckYou
} = regionsSlice.selectors

export default regionsSlice.reducer