import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { endpoints } from "../api"

export const initialState = []

export const getUserInventory = createAsyncThunk("userInventory/getUserInventory", async ({ userId, transactionType, headers }, thunkAPI) => {
    try {
        let { result: { data: { items, nextCursor } } } = await thunkAPI.dispatch(
            endpoints.getTransactions.initiate({ data: { userId, transactionType, limit: 100 }, headers }))
            .unwrap()
        let allTransactions = [...items]
        while (nextCursor) {
            let { result: { data: moreData } } = await thunkAPI.dispatch(
                endpoints.getTransactions.initiate({ data: { userId, transactionType, cursor: nextCursor, limit: 100 }, headers }))
                .unwrap()
            allTransactions = [...allTransactions, ...moreData.items]
            nextCursor = moreData.nextCursor
        }
        return Promise.resolve(allTransactions)
    } catch (err) {
        console.log("OH NO", err)
        //return Promise.reject()
    }
})

export const userInventorySlice = createSlice({
    name: 'userInventory',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInventory.fulfilled, (state, action) => {
                return action.payload
            })
    }
})