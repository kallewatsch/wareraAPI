import { createSlice } from '@reduxjs/toolkit'
//import initialStateUsers from "../../mocks/states/initialStateUsers.json"

export const initialState = []

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUsers(state, action) {
            return [...state, ...action.payload]
        },
        setUsers(state, action) {
            return action.payload
        }
    }
})

export default usersSlice.reducer