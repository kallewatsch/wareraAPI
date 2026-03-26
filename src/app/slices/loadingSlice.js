import { createSelector, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"

export const initialState = { isLoading: false, pending: [], requestsLastMinute: [] }

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setIsLoading(state, action) {
            return {
                ...state,
                isLoading: action.payload
            }
        },
        updateRequestsLastMinute(state, action) {
            const minAge = Date.now() - (60 * 1000)
            return {
                ...state,
                requestsLastMinute: [...state.requestsLastMinute.filter(x => x >= minAge)]
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPending, (state, action) => {
                const { requestId, startedTimeStamp } = action.meta
                const newPending = [...state.pending, requestId]
                const minAge = Date.now() - (60 * 1000)
                const newRequestsLastMinute = [...state.requestsLastMinute.filter(x => x >= minAge), startedTimeStamp]
                return {
                    ...state,
                    //pending: [...state.pending, action.meta.requestId]
                    pending: newPending,
                    requestsLastMinute: newRequestsLastMinute
                }
            })
            .addMatcher(isRejected, (state, action) => {
                const otherRequests = [...state.pending].filter(x => x != action.meta.requestId)
                const minAge = Date.now() - (60 * 1000)
                const newRequestsLastMinute = [...state.requestsLastMinute.filter(x => x >= minAge)]
                return {
                    ...state,
                    isLoading: otherRequests.length > 0,
                    pending: otherRequests,
                    requestsLastMinute: newRequestsLastMinute
                }
            })
            .addMatcher(isFulfilled, (state, action) => {
                const otherRequests = [...state.pending].filter(x => x != action.meta.requestId)
                const minAge = Date.now() - (60 * 1000)
                const newRequestsLastMinute = [...state.requestsLastMinute.filter(x => x >= minAge)]
                return {
                    ...state,
                    isLoading: otherRequests.length > 0,
                    pending: otherRequests,
                    requestsLastMinute: newRequestsLastMinute
                }
            })
    },
    selectors: {
        selectRequestLastMinute: createSelector(
            [
                state => state.requestsLastMinute,
                (requestsLastMinute, minAge) => minAge
            ],
            (requestsLastMinute, minAge) => {
                return requestsLastMinute.filter(x => x >= minAge)
            }
        ),
        rateLimitReached: createSelector(
            [
                state => state.requestsLastMinute,
                (pending, rateLimit) => rateLimit
            ],
            (requestsLastMinute, rateLimit) => requestsLastMinute.length >= rateLimit
        )
    }
})

export const { setIsLoading, updateRequestsLastMinute } = loadingSlice.actions

export const { selectRequestLastMinute, rateLimitReached } = loadingSlice.selectors

export default loadingSlice.reducer