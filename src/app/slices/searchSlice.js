import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { endpoints } from '../api'

export const initialState = {}

export const getSearchResult = createAsyncThunk("search/getSearchResult", async ({ searchText }, thunkAPI) => {
    try {
        const { result: { data, error } } = await thunkAPI.dispatch(endpoints.searchAnything.initiate({ searchText })).unwrap()
        return Promise.resolve(data)
    } catch (err) {
        console.log("OH NO", err)
        //return Promise.reject()
    }
})

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchResult(state, action) {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchResult.fulfilled, (state, action) => {
                return action.payload
            })
    }
})

export const {
    setSearchResult
} = searchSlice.actions

export default searchSlice.reducer