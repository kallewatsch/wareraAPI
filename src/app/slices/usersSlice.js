import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { endpoints } from '../api'
import { useDispatch } from 'react-redux'
//import initialStateUsers from "../../mocks/states/initialStateUsers.json"

export const initialState = []


export const addUsers = createAsyncThunk('users/addUsers', async ({ userIds, chunksize }, thunkAPI) => {
    try {
        let allUsers = []
        const ep = 'user.getUserLite'
        const _userIds = [...userIds]
        while (_userIds.length) {
            const chunk = _userIds.splice(0, chunksize)
            const payloadPost = {
                endpoints: chunk.map(item => ep),
                obj: Object.fromEntries(chunk.map((val, i) => [i, { userId: val }]))
            }
            const someUsers = await thunkAPI.dispatch(endpoints.getAnythingBatchedPost.initiate(payloadPost)).unwrap()
            allUsers = [...allUsers, ...someUsers]
        }
        return Promise.resolve(allUsers)
    } catch (err) {
        console.log("OH NO", err)
        //return Promise.reject()
    }
})

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action) {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUsers.fulfilled, (state, action) => {
                const filtered = action.payload.filter(user => state.every(existingUser => existingUser._id != user._id))
                return filtered.length ? [...state, ...filtered] : state
            })
            .addCase(addUsers.pending, (state, action) => {
                return state
            })
            .addCase(addUsers.rejected, (state, action) => {
                return state
            })
    },
    selectors: {
        selectUser: createSelector(
            [
                state => state,
                (state, userId) => userId
            ],
            (state, userId) => state.find(user => user._id === userId)
        ),
        selectUsers: createSelector(
            [
                state => state,
                (state, userIds) => userIds
            ],
            (users, userIds) => users.filter(user => userIds.includes(user._id))
        ),
        selectCountryUsers: createSelector(
            [
                state => state,
                (state, countryId) => countryId
            ],
            (users, countryId) => users.filter(user => user.country === countryId)
        ),
        selectMuUsers: createSelector(
            [
                state => state,
                (state, muId) => muId
            ],
            (users, muId) => users.filter(user => user.mu === muId)
        )
    }
})

export const {
    setUsers
} = usersSlice.actions

export const {
    selectUser,
    selectUsers,
    selectCountryUsers,
    selectMuUsers
} = usersSlice.selectors

export default usersSlice.reducer