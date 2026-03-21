import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"

export const initialState = { isLoading: false, pending: [] }

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setIsLoading(state, action) {
            return {
                ...state,
                isLoading: action.payload
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPending, (state, action) => {
                return {
                    ...state,
                    pending: [...state.pending, action.meta.requestId]
                }
            })
            .addMatcher(isRejected, (state, action) => {
                const otherRequests = [...state.pending].filter(x => x != action.meta.requestId)
                return {
                    isLoading: otherRequests.length > 0,
                    pending: otherRequests
                }
            })
            .addMatcher(isFulfilled, (state, action) => {
                const otherRequests = [...state.pending].filter(x => x != action.meta.requestId)
                return {
                    isLoading: otherRequests.length > 0,
                    pending: otherRequests
                }
            })
    }
})

export const { setIsLoading } = loadingSlice.actions

export default loadingSlice.reducer