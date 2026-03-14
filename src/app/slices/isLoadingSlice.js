import { createSlice } from '@reduxjs/toolkit'
import { addUsers } from './usersSlice'

export const initialState = false

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState,
    reducers: {
        setIsLoading(state, action) {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUsers.pending, () => true)
            .addCase(addUsers.rejected, () => false)
            .addCase(addUsers.fulfilled, () => false)
    }
})

export default isLoadingSlice.reducer