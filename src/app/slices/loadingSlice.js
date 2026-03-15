import { createSlice } from '@reduxjs/toolkit'
import { addUsers } from './usersSlice'

export const initialState = { isLoading: false, requests: [] }

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
        setIsLoadingPending(state, action) {
            const { type, requestId: id, items } = action.payload.request
            return {
                isLoading: true,
                requests: [...state.requests, { type, id, items }]
            }
        },
        setIsLoadingRejected(state, action) {
            return {
                isLoading: state.requests.filter(item => item.id != action.payload.request.requestId).length > 0,
                requests: state.requests.filter(item => item.id != action.payload.request.requestId)
            }
        },
        setIsLoadingFulFilled(state, action) {
            return {
                isLoading: state.requests.filter(item => item.id != action.payload.request.requestId).length > 0,
                requests: state.requests.filter(item => item.id != action.payload.request.requestId)
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUsers.pending, (state, action) => {
                return {
                    isLoading: true,
                    requests: [...state.requests, { type: 'users', id: action.meta.requestId, items: action.meta.arg.userIds.length }]
                }
            })
            .addCase(addUsers.rejected, (state, action) => {
                return {
                    isLoading: state.requests.filter(item => item.id != action.meta.requestId).length > 0,
                    requests: state.requests.filter(item => item.id != action.meta.requestId)
                }
            })
            .addCase(addUsers.fulfilled, (state, action) => {
                return {
                    isLoading: state.requests.filter(item => item.id != action.meta.requestId).length > 0,
                    requests: state.requests.filter(item => item.id != action.meta.requestId)
                }
            })
    }
})

export default loadingSlice.reducer