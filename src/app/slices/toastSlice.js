import { createSlice } from '@reduxjs/toolkit'

export const initialState = { show: false, content: '', bg: 'danger' }

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast(state, action) {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const {
    setToast
} = toastSlice.actions

export default toastSlice.reducer