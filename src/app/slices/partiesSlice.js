import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { endpoints } from '../api'


export const initialState = []

export const addParties = createAsyncThunk('parties/addParty', async ({ countryId }, thunkAPI) => {
    try {
        const payload = { limit: 100, countryId }
        let { result: { data: { items, nextCursor }, error } } = await thunkAPI.dispatch(endpoints.getPartiesPaginated.initiate(payload)).unwrap()
        let allParties = [...items]
        while (nextCursor) {
            const anotherPayload = { limit: 100, countryId, cursor: nextCursor }
            let { result: { data: moreData }, error } = await thunkAPI.dispatch(endpoints.getPartiesPaginated.initiate(anotherPayload)).unwrap()
            allParties = [...allParties, ...moreData.items]
            nextCursor = moreData.nextCursor
        }
        return Promise.resolve(allParties)
    } catch (err) {
        console.log("OH NO", err)
        //return Promise.reject()
    }
})

export const partiesSlice = createSlice({
    name: 'parties',
    initialState,
    reducers: {
        setParties(state, action) {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addParties.fulfilled, (state, action) => {
                const filtered = action.payload.filter(party => state.every(existingParty => existingParty._id != party._id))
                return filtered.length ? [...state, ...filtered] : state
            })
    }
})

export const {
    setParties
} = partiesSlice.actions

export default partiesSlice.reducer