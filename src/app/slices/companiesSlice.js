import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { endpoints } from '../api'

export const initialState = []

export const getCompanies = createAsyncThunk("companies/getCompanies", async ({ userIds, chunksizeGetCompanies, chunksizeGetById }, thunkAPI) => {
    try {
        let allCompanyIds = []
        const epCompanies = 'company.getCompanies'
        while (userIds.length) {
            // TODO: the hardcoded splice part is meh. Implement logic do determine POST body size in advance
            //       and set it to max. 
            const chunk = userIds.splice(0, chunksizeGetCompanies) // 600

            const payloadPost = {
                endpoints: chunk.map(item => epCompanies),
                obj: Object.fromEntries(chunk.map((val, i) => [i, { userId: val._id, perPage: 100 }]))
            }

            const someCompanyIds = await thunkAPI.dispatch(endpoints.getAnythingBatchedPost.initiate(payloadPost)).unwrap()
            allCompanyIds = [...allCompanyIds, ...someCompanyIds]
        }

        let companyIds = allCompanyIds.map(x => x.items).flat()
        let allCompanies = []
        const ep2 = 'company.getById'
        while (companyIds.length) {
            // TODO: the hardcoded splice part is meh. Implement logic do determine POST body size in advance
            //       and set it to max. Compare this with about. the 600 vs 800 is because of the extra perPage
            //       used above
            const chunk = companyIds.splice(0, chunksizeGetById) //800

            const payloadPost = {
                endpoints: chunk.map(item => ep2),
                obj: Object.fromEntries(chunk.map((val, i) => [i, { companyId: val }]))
            }
            const someCompanies = await thunkAPI.dispatch(endpoints.getAnythingBatchedPost.initiate(payloadPost)).unwrap()
            allCompanies = [...allCompanies, ...someCompanies]
        }
        return Promise.resolve(allCompanies)
    } catch (err) {
        console.log("OH NO", err)
        //return Promise.reject()
    }
})

export const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        setCompanies(state, action) {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCompanies.fulfilled, (state, action) => {
                return action.payload
            })
    }
})

export const {
    setCompanies
} = companiesSlice.actions

export default companiesSlice.reducer