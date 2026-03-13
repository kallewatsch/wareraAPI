import { createSlice } from '@reduxjs/toolkit'
//import { initialStateWarplaner as stateMock } from '../../mocks/states/initialStateWarplaner'

export const initialState = {
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

export const warplanerSlice = createSlice({
    name: 'warplaner',
    initialState,
    reducers: {
        setWarPlaner(state, action) {
            return action.payload
        },
        resetWarPlaner(state, action) {
            return initialState
        }
    }
})

export default warplanerSlice.reducer