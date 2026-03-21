import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { endpoints } from '../api'

export const initialState = []

export const getEvents = createAsyncThunk("wareraEvent/getEvents", async ({ filterEvents, countryId }, thunkAPI) => {
    try {
        const payload = { limit: 100, countryId, eventTypes: filterEvents }
        let { result: { data: { items, nextCursor }, error } } = await thunkAPI.dispatch(endpoints.getEventsPaginated.initiate(payload)).unwrap()
        let allEvents = [...items]
        while (nextCursor) {
            const anotherPayload = { limit: 100, countryId, eventTypes: filterEvents, cursor: nextCursor }
            let { result: { data: moreData }, error } = await thunkAPI.dispatch(endpoints.getEventsPaginated.initiate(anotherPayload)).unwrap()
            allEvents = [...allEvents, ...moreData.items]
            nextCursor = moreData.nextCursor
        }
        return Promise.resolve(allEvents)
    } catch (err) {
        console.log("OH NO", err)
        //return Promise.reject()
    }
})

export const wareraEventsSlice = createSlice({
    name: 'wareraEvents',
    initialState,
    reducers: {
        setConfig(state, action) {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEvents.fulfilled, (state, action) => {
                return action.payload
            })
    }
})

export const {
    setConfig
} = wareraEventsSlice.actions

export default wareraEventsSlice.reducer