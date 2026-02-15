import { createSlice } from '@reduxjs/toolkit'
import { initialStateWarplaner as stateMock } from '../mocks/initialStateWarplaner'

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
    data: 'miau',
    freeMUs: [],
    countries: [],
    mus: [],
    isLoading: false,
    users: [],
    regions: [],
    companies: [],
    //warplaner: stateMock,
    warplaner: initialStateWarplaner,
    search: {}
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
                    attackers: { ids: [], countries: [], allies: [] },
                    defenders: { ids: [], countries: [], allies: [] }
                }
            }
        },
        setSearchResult(state, action) {
            return {
                ...state,
                search: action.payload
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
    addUsers,
    setRegions,
    setCompanies,
    setWarPlaner,
    resetWarPlaner,
    setSearchResult
} = appSlice.actions


export default appSlice.reducer