import { createSlice } from '@reduxjs/toolkit'

export const initialState = {}

export const regionsSlice = createSlice({
    name: 'regions',
    initialState,
    reducers: {
        setRegions(state, action) {
            return action.payload
        }
    }
})

export default regionsSlice.reducer