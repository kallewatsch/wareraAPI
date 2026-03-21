import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { endpoints } from '../api'

export const initialState = {}

export const getConfig = createAsyncThunk("config/getConfig", async (_, thunkAPI) => {
    try {
        const { result: { data: config } } = await thunkAPI.dispatch(endpoints.getGameConfig.initiate()).unwrap()
        return Promise.resolve(config)
    } catch (err) {
        console.log("OH NO", err)
        //return Promise.reject()
    }
})

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setConfig(state, action) {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConfig.fulfilled, (state, action) => {
                return action.payload
            })
    }
})

export const {
    setConfig
} = configSlice.actions

export default configSlice.reducer