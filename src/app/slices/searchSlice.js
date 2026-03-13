import { createSlice } from '@reduxjs/toolkit'

export const initialState = {}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchResult(state, action) {
            return action.payload
        }
    }
})

export default searchSlice.reducer