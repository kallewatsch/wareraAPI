import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { endpoints } from '../api'

export const initialState = []

export const getCountries = createAsyncThunk("countries/GetCountries", async (_, thunkAPI) => {
    try {
        const { result: { data: countries } } = await thunkAPI.dispatch(endpoints.getAllCountries.initiate()).unwrap()
        return Promise.resolve(countries)
    } catch (err) {
        console.log("OH NO")
        //return Promise.reject()
    }
})

export const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        setCountries(state, action) {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCountries.fulfilled, (state, action) => {
                return action.payload
            })
    }
})

export const {
    setCountries
} = countriesSlice.actions

export default countriesSlice.reducer