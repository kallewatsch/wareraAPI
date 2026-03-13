import { createSlice } from '@reduxjs/toolkit'

export const initialState = []

export const musSlice = createSlice({
    name: 'mus',
    initialState,
    reducers: {
        setMus(state, action) {
            return action.payload
        }
    }
})

export default musSlice.reducer