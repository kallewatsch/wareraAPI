import { createSlice } from '@reduxjs/toolkit' 

export const initialState = []

export const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        setCompanies(state, action) {
            return action.payload
        }
    }
})

export default companiesSlice.reducer