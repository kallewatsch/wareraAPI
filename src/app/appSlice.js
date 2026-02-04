import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    data: 'miau',
    freeMUs: []
}

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setData(state, action) {
            return {
                ...state,
                data: action.payload
            }
        },
        setFreeMUs(state, action) {
            return {
                ...state,
                freeMUs: action.payload
            }
        }
    }
})


export const {
    setData,
    setFreeMUs
} = appSlice.actions


export default appSlice.reducer