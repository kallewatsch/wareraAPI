import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { endpoints } from '../api'

export const initialState = []

export const getMus = createAsyncThunk("mus/getMus", async (_, thunkAPI) => {
    try {
        let { result: { data: { items, nextCursor }, error } } = await thunkAPI.dispatch(endpoints.getMusPaginated.initiate({ limit: 100 })).unwrap()
        let allItems = [...items]
        while (nextCursor) {
            let { result: { data: moreData }, error } = await thunkAPI.dispatch(endpoints.getMusPaginated.initiate({ cursor: nextCursor, limit: 100 })).unwrap()
            allItems = [...allItems, ...moreData.items]
            nextCursor = moreData.nextCursor
        }
        return Promise.resolve(allItems)
    } catch (err) {
        console.log("OH NO", err)
        //return Promise.reject()
    }
})

export const musSlice = createSlice({
    name: 'mus',
    initialState,
    reducers: {
        setMus(state, action) {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMus.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(getMus.pending, (state, action) => {
                return state
            })
            .addCase(getMus.rejected, (state, action) => {
                return state
            })
    }
})

export const {
    setMus
} = musSlice.actions

export default musSlice.reducer