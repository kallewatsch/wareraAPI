import { combineReducers } from '@reduxjs/toolkit'
import { countriesSlice } from "./slices/countriesSlice"
import { musSlice } from "./slices/musSlice"
import { isLoadingSlice } from "./slices/isLoadingSlice"
import { userIdsSlice } from "./slices/userIdsSlice"
import { usersSlice } from "./slices/usersSlice"
import { regionsSlice } from "./slices/regionsSlice"
import { companiesSlice } from "./slices/companiesSlice"
import { warplanerSlice } from "./slices/warplanerSlice"
import { searchSlice } from "./slices/searchSlice"
import { configSlice } from "./slices/configSlice"
import { toastSlice } from "./slices/toastSlice"
import { upgradesSlice } from "./slices/upgradesSlice"


export const { setCountries } = countriesSlice.actions
export const { addMus, setMus } = musSlice.actions
export const { setIsLoading } = isLoadingSlice.actions
export const { setUserIds } = userIdsSlice.actions
export const { setUsers, addUsers } = usersSlice.actions
export const { setRegions } = regionsSlice.actions
export const { setCompanies } = companiesSlice.actions
export const { setWarPlaner, resetWarPlaner } = warplanerSlice.actions
export const { setSearchResult } = searchSlice.actions
export const { setConfig } = configSlice.actions
export const { setToast } = toastSlice.actions
export const { setUpgrades } = upgradesSlice.actions

export const appReducer = combineReducers({
    countries: countriesSlice.reducer,
    mus: musSlice.reducer,
    isLoading: isLoadingSlice.reducer,
    userIds: userIdsSlice.reducer,
    users: usersSlice.reducer,
    regions: regionsSlice.reducer,
    companies: companiesSlice.reducer,
    warplaner: warplanerSlice.reducer,
    search: searchSlice.reducer,
    config: configSlice.reducer,
    toast: toastSlice.reducer,
    upgrades: upgradesSlice.reducer
})

export default appReducer