import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    data: 'miau'
}

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setData(state, action) {
            console.log(action.payload)
            return {
                ...state,
                data: action.payload
            }
        }
    }
})


export const {
    setData,
} = appSlice.actions


export default appSlice.reducer