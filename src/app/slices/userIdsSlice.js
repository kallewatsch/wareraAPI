import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { endpoints } from '../api'

export const initialState = []

export const getUserIds = createAsyncThunk("userIds/getUserIds", async ({ countryIds, chunksize }, thunkAPI) => {
    try {
  
        const ep = 'user.getUsersByCountry'
        let allCountryUserIds = []
        const _countryIds = [...countryIds]

        while (_countryIds.length) {
            const chunk = _countryIds.splice(0, chunksize)
            const obj = Object.fromEntries(chunk.map((val, i) => [i, { countryId: val, limit: 100 }]))
            const payloadPost = {
                endpoints: chunk.map(item => ep),
                obj: obj
            }
            const someCountryUsers = await thunkAPI.dispatch(endpoints.getAnythingBatchedPost.initiate(payloadPost)).unwrap()
            const fuck = someCountryUsers.map((x, i) => ({ countryId: obj[i]?.countryId, ...x }))
            allCountryUserIds = [...allCountryUserIds, ...fuck]
        }

        let blaUsersByCountry = allCountryUserIds.map(x => ({ countryId: x.countryId, users: x.items.map(item => item._id) }))
        let worldUserIds = allCountryUserIds.map(x => x.items.map(item => item._id)).flat()

        let countryUserIds = allCountryUserIds.filter(item => item.nextCursor) // [{id: 'abc', items: [], nextCursor}]

        while (countryUserIds.length) {
            const obj2 = Object.fromEntries(countryUserIds.map((val, i) => [i, { countryId: val.countryId, limit: 100, cursor: val.nextCursor }]))
            const payloadPost2 = {
                endpoints: countryUserIds.map(item => ep),
                obj: obj2
            }
            const moreCountryUsers = await thunkAPI.dispatch(endpoints.getAnythingBatchedPost.initiate(payloadPost2)).unwrap()
            const fuck2 = moreCountryUsers.map((x, i) => ({ countryId: obj2[i]?.countryId, ...x }))
            const moreBlaUsersByCountry = fuck2.map(x => ({ countryId: x.countryId, users: x.items.map(item => item._id) }))
            let moreWorldUserIds = fuck2.map(x => x.items.map(item => item._id)).flat()

            worldUserIds = [...worldUserIds, ...moreWorldUserIds]
            blaUsersByCountry = [...blaUsersByCountry, moreBlaUsersByCountry]
            const shit = moreCountryUsers.map((x, i) => ({ countryId: obj2[i]?.countryId, ...x }))

            countryUserIds = shit.filter(item => item.nextCursor)
        }
        const foobar = Object.groupBy(blaUsersByCountry.flat(), ({ countryId }) => countryId)
        const userIds = Object.keys(foobar).flatMap(countryId => {
            return foobar[countryId].flatMap(x => x.users).map(userId => ({ countryId, userId }))
        })
        return Promise.resolve(userIds)
    } catch (err) {
        console.log("OH NO", err)
        //return Promise.reject()
    }
})

export const userIdsSlice = createSlice({
    name: 'userIds',
    initialState,
    reducers: {
        setUserIds(state, action) {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserIds.fulfilled, (state, action) => {
                console.log(action)
                return action.payload
            })
    }
})

export const {
    setUserIds
} = userIdsSlice.actions

export default userIdsSlice.reducer