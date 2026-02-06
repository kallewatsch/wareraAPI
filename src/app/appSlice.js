import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    data: 'miau',
    freeMUs: [],
    countries: [],
    mus: [],
    isLoading: false,
    users: []
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
        },
        setCountries(state, action) {
            return {
                ...state,
                countries: action.payload
            }
        },
        addMus(state, action) {
            const newMus = [...state.mus, ...action.payload]
            return {
                ...state,
                mus: newMus
            }
        },
        setIsLoading(state, action) {
            return {
                ...state,
                isLoading: action.payload
            }
        },
        setUsers(state, action) {
            return {
                ...state,
                users: action.payload
            }
        },
        addUsers(state, action) {
            const newUsers = [...state.users, ...action.payload]
            return {
                ...state,
                users: newUsers
            }
        }
    }
})


export const {
    setData,
    setFreeMUs,
    setCountries,
    addMus,
    setIsLoading,
    setUsers,
    addUsers
} = appSlice.actions


export default appSlice.reducer