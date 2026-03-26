import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    showModal: true,
    apiKey: "",
    rateLimit: 100,
    ready: false
}


export const apikeySlice = createSlice({
    name: 'apikey',
    initialState,
    reducers: {
        setShowModal(state, action) {
            return {
                ...state,
                showModal: action.payload
            }
        },
        setApiKey(state, action) {
            return {
                ...state,
                apiKey: action.payload
            }
        },
        setRateLimit(state, action) {
            return {
                ...state,
                rateLimit: action.payload
            }
        },
        setReady(state, action) {
            return {
                ...state,
                ready: action.payload
            }
        }
    }
})

export const { setShowModal, setApiKey, setRateLimit, setReady } = apikeySlice.actions

export default apikeySlice.reducer