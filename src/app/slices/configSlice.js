import { createSlice } from '@reduxjs/toolkit'

export const initialState = {}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setConfig(state, action) {
            return action.payload
        }
    }
})

export default configSlice.reducer