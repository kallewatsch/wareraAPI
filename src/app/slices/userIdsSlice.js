import { createSlice } from '@reduxjs/toolkit'

export const initialState = []

export const userIdsSlice = createSlice({
    name: 'userIds',
    initialState,
    reducers: {
        setUserIds(state, action) {
            return action.payload
        }
    }
})

export default userIdsSlice.reducer