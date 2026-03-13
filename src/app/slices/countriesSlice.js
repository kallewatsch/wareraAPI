import { createSlice } from '@reduxjs/toolkit'

export const initialState = []

export const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        setCountries(state, action) {
            return action.payload
        }
    }
})

export default countriesSlice.reducer