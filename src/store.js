import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { wareraApi } from './app/api'
import appReducer from "./app/appSlice"


export const rootReducer = combineReducers({
    [wareraApi.reducerPath]: wareraApi.reducer,
    app: appReducer
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            wareraApi.middleware,
        )
})

export const setupStore = preloadedState => configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            wareraApi.middleware,

        )
})

export default store