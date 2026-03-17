import { combineReducers } from '@reduxjs/toolkit'
import { countriesSlice } from "./slices/countriesSlice"
import { musSlice } from "./slices/musSlice"
import { loadingSlice } from "./slices/loadingSlice"
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


export const { setCountries } = countriesSlice.actions
export const { addMus, setMus } = musSlice.actions
export const { setIsLoading, setIsLoadingPending, setIsLoadingRejected, setIsLoadingFulFilled } = loadingSlice.actions
export const { setUserIds } = userIdsSlice.actions
export const { setUsers, addUsers } = usersSlice.actions
export const { setRegions } = regionsSlice.actions
export const { setCompanies } = companiesSlice.actions
export const { setWarPlaner, resetWarPlaner } = warplanerSlice.actions
export const { setSearchResult } = searchSlice.actions
export const { setConfig } = configSlice.actions
export const { setToast } = toastSlice.actions
export const { setUpgrades } = upgradesSlice.actions
export const {
    resetAll,
    resetSkills,
    resetEquipment,
    resetFood,
    setSkill,
    setEquipment,
    setEquipmentItem,
    setEquipmentItemValue,
} = skillbuildSlice.actions

export const appReducer = combineReducers({
    countries: countriesSlice.reducer,
    mus: musSlice.reducer,
    loading: loadingSlice.reducer,
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
})

export default appReducer