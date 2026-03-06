import { createSlice } from '@reduxjs/toolkit'
import { initialStateWarplaner as stateMock } from '../mocks/states/initialStateWarplaner'

const initialStateWarplaner = {
    attackers: {
        ids: [],
        countries: [],
        allies: [],
        excluded: []
    },
    defenders: {
        ids: [],
        countries: [],
        allies: [],
        excluded: []
    }
}

export const initialState = {
    freeMUs: [],
    countries: [],
    mus: [],
    isLoading: false,
    users: [],
    regions: [],
    companies: [],
    //warplaner: stateMock,
    warplaner: initialStateWarplaner,
    search: {},
    market: {},
    config: {},
    worldusers: {},
    toast: {show: false, content: '', bg: 'danger'}
    //transactions: [],
}

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
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
        setMus(state, action) {
            return {
                ...state,
                mus: action.payload
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
            // This is the stupid approach, one big ass array ob objects
            // If this doesnt work, try changing users from array to object
            // with countryId as keys and array of users as value
            const existingUsers = [...state.users]
            //const newUsers = [...state.users, ...action.payload]
            const newUsers = action.payload.filter(user => existingUsers.every(existingUser => existingUser._id !== user._id))
            return {
                ...state,
                users: [...existingUsers, ...newUsers]
            }
            /* return {
                ...state,
                users: newUsers
            } */
        },
        setRegions(state, action) {
            return {
                ...state,
                regions: action.payload
            }
        },
        setCompanies(state, action) {
            return {
                ...state,
                companies: action.payload
            }
        },
        setWarPlaner(state, action) {
            return {
                ...state,
                warplaner: action.payload
            }
        },
        resetWarPlaner(state, action) {
            return {
                ...state,
                warplaner: {
                    attackers: { ids: [], countries: [], allies: [], excluded: [] },
                    defenders: { ids: [], countries: [], allies: [], excluded: [] }
                }
            }
        },
        setSearchResult(state, action) {
            return {
                ...state,
                search: action.payload
            }
        },
        setMarket(state, action) {
            return {
                ...state,
                market: action.payload
            }
        },
        setConfig(state, action) {
            return {
                ...state,
                config: action.payload
            }
        },
        setWorldUsers(state, action) {
            return {
                ...state,
                worldusers: action.payload
            }
        },
        setToast(state, action) {
            return {
                ...state,
                toast: action.payload
            }
        }
    }
})


export const {
    setFreeMUs,
    setCountries,
    addMus,
    setMus,
    setIsLoading,
    setUsers,
    addUsers,
    setRegions,
    setCompanies,
    setWarPlaner,
    resetWarPlaner,
    setSearchResult,
    setMarket,
    setConfig,
    setWorldUsers,
    setToast,
} = appSlice.actions


export default appSlice.reducer