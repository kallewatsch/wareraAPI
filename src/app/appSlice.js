import { combineReducers } from '@reduxjs/toolkit'
import { countriesSlice } from "./slices/countriesSlice"
import { musSlice } from "./slices/musSlice"
import { userIdsSlice } from "./slices/userIdsSlice"
import { usersSlice } from "./slices/usersSlice"
import { regionsSlice } from "./slices/regionsSlice"
import { companiesSlice } from "./slices/companiesSlice"
import { warplanerSlice } from "./slices/warplanerSlice"
import { searchSlice } from "./slices/searchSlice"
import { configSlice } from "./slices/configSlice"
import { toastSlice } from "./slices/toastSlice"
import { upgradesSlice } from "./slices/upgradesSlice"
import { skillbuildSlice } from "./slices/skillbuildSlice"
import { wareraEventsSlice } from "./slices/wareraEventsSlice"
import { userInventorySlice } from './slices/userInventorySlice'
import { loadingSlice } from './slices/loadingSlice'


export const appReducer = combineReducers({
    countries: countriesSlice.reducer,
    mus: musSlice.reducer,
    userIds: userIdsSlice.reducer,
    users: usersSlice.reducer,
    regions: regionsSlice.reducer,
    companies: companiesSlice.reducer,
    warplaner: warplanerSlice.reducer,
    search: searchSlice.reducer,
    config: configSlice.reducer,
    toast: toastSlice.reducer,
    upgrades: upgradesSlice.reducer,
    skillbuild: skillbuildSlice.reducer,
    wareraEvents: wareraEventsSlice.reducer,
    userInventory: userInventorySlice.reducer,
    loading: loadingSlice.reducer,
})

export default appReducer