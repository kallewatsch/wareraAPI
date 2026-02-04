import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { wareraApi } from './app/api'
import appReducer from "./app/appSlice"
/* import toastReducer from './features/toast/toastSlice'
import { osmApi, overpassApi, mapboxGeocodingApi } from './features/map/api'
import mapReducer from './features/map/mapSlice'
import authReducer from './app/authSlice' */


export const rootReducer = combineReducers({
    [wareraApi.reducerPath]: wareraApi.reducer,
    app: appReducer
    /* [osmApi.reducerPath]: osmApi.reducer,
    [overpassApi.reducerPath]: overpassApi.reducer,
    [mapboxGeocodingApi.reducerPath]: mapboxGeocodingApi.reducer,
    mapbox: mapReducer,
    auth: authReducer,
    toastService: toastReducer, */
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            wareraApi.middleware,
            /* osmApi.middleware,
            overpassApi.middleware,
            mapboxGeocodingApi.middleware, */
        )
})

export const setupStore = preloadedState => configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            wareraApi.middleware,
            /* osmApi.middleware,
            overpassApi.middleware,
            mapboxGeocodingApi.middleware, */
        )
})

export default store