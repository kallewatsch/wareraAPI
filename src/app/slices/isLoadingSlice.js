import { createSlice } from '@reduxjs/toolkit'

export const initialState = false

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState,
    reducers: {
        setIsLoading(state, action) {
            return action.payload
        }
    }
})

export default isLoadingSlice.reducer