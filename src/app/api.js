import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//import { BASEURL_DEV, BASEURL_PROD } from './settings'

const baseUrl = 'https://api2.warera.io/trpc'//BASEURL_DEV

export const wareraApi = createApi({
    reducerPath: 'wareraApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        getCompanyById: builder.query({
            query: ({ companyId }) => {
                return {
                    url: 'company.getById',
                    method: 'GET',
                    params: { input: JSON.stringify({ companyId }) }
                }
            }
        }),
        getCompanies: builder.query({
            /* 
            {
                "userId": "string",
                "orgId": "string",
                "perPage": 10,
                "cursor": "string"
            }
            */
            query: (data) => {
                return {
                    url: 'company.getCompanies',
                    method: 'GET',
                    params: { input: JSON.stringify(data) }
                }
            }
        }),
        getCountryById: builder.query({
            query: ({ countryId }) => {
                return {
                    url: 'country.getCountryById',
                    method: 'GET',
                    params: { input: JSON.stringify({ countryId }) }
                }
            }
        }),
        getAllCountries: builder.query({
            query: () => {
                return {
                    url: 'country.getAllCountries',
                    method: 'GET'
                }
            }
        }),
        getEventsPaginated: builder.query({
            // TODO: theres are multiple parameters
            query: (data) => {
                return {
                    url: 'event.getEventsPaginated',
                    method: 'GET',
                    params: { input: JSON.stringify(data) }
                }
            }
        }),
        getGovernmentById: builder.query({
            query: ({ countryId }) => {
                return {
                    url: 'government.getByCountryId',
                    method: 'GET',
                    params: { input: JSON.stringify({ countryId }) }
                }
            }
        }),
        getRegionById: builder.query({
            query: ({ regionId }) => {
                let trpcData = { regionId: regionId }
                return {
                    url: 'region.getById',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getRegions: builder.query({
            query: () => {
                return {
                    url: 'region.getRegionsObject',
                    method: 'GET'
                }
            }
        }),
        getBattleById: builder.query({
            query: ({ battleId }) => {
                let trpcData = { battleId: battleId }
                return {
                    url: 'battle.getById',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getBattleLive: builder.query({
            query: ({ battleId }) => {
                // TODO: there are multiple params
                let trpcData = { battleId: battleId }
                return {
                    url: 'battle.getLiveBattleData',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getBattles: builder.query({
            query: ({ battleId }) => {
                // TODO: there are multiple params
                let trpcData = { battleId: battleId }
                return {
                    url: 'battle.getBattles',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getRoundById: builder.query({
            query: ({ roundId }) => {
                let trpcData = { roundId: roundId }
                return {
                    url: 'round.getById',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getRoundLastHits: builder.query({
            query: ({ roundId }) => {
                let trpcData = { roundId: roundId }
                return {
                    url: 'round.getLastHits',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getBattleRanking: builder.query({
            query: ({ roundId }) => {
                // TODO: there are multiple params
                let trpcData = { roundId: roundId }
                return {
                    url: 'battleRanking.getRanking',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getPrices: builder.query({
            query: () => {
                return {
                    url: 'itemTrading.getPrices',
                    method: 'GET'
                }
            }
        }),
        getTopOrders: builder.query({
            query: (data) => {
                // TODO: there are multiple params
                //let trpcData = {roundId: roundId}
                return {
                    url: 'tradingOrder.getTopOrders',
                    method: 'GET',
                    params: { input: JSON.stringify(data) }
                }
            }
        }),
        getItemOffer: builder.query({
            query: ({ itemOfferId }) => {
                let trpcData = { itemOfferId: itemOfferId }
                return {
                    url: 'itemOffer.getById',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getWorkOffer: builder.query({
            query: ({ workOfferId }) => {
                let trpcData = { workOfferId: workOfferId }
                return {
                    url: 'workOffer.getById',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getWorkOfferByCompany: builder.query({
            query: ({ companyId }) => {
                let trpcData = { companyId: companyId }
                return {
                    url: 'workOffer.getWorkOfferByCompanyId',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getWorkOffersPaginated: builder.query({
            query: ({ workOfferId }) => {
                // TODO: there are multiple params
                let trpcData = { workOfferId: workOfferId }
                return {
                    url: 'workOffer.getWorkOffersPaginated',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getRanking: builder.query({
            query: ({ rankingType }) => {
                let trpcData = { rankingType: rankingType }
                return {
                    url: 'ranking.getRanking',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        searchAnything: builder.query({
            query: ({ searchText }) => {
                let trpcData = { searchText: searchText }
                return {
                    url: 'search.searchAnything',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getGameDates: builder.query({
            query: () => {
                return {
                    url: 'gameConfig.getDates',
                    method: 'GET'
                }
            }
        }),
        getGameConfig: builder.query({
            query: () => {
                return {
                    url: 'gameConfig.getGameConfig',
                    method: 'GET'
                }
            }
        }),
        getUser: builder.query({
            query: ({ userId }) => {
                let trpcData = { userId: userId }
                return {
                    url: 'user.getUserLite',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getUsersByCountry: builder.query({
            query: (data) => {
                // TODO: there are multiple params
                return {
                    url: 'user.getUsersByCountry',
                    method: 'GET',
                    params: { input: JSON.stringify(data) }
                }
            }
        }),
        getArticle: builder.query({
            query: ({ articleId }) => {
                let trpcData = { articleId: articleId }
                return {
                    url: 'article.getArticleById',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getArticlesPaginated: builder.query({
            query: (data) => {
                // TODO: there are multiple params
                //let trpcData = {articleId: articleId}
                return {
                    url: 'article.getArticlesPaginated',
                    method: 'GET',
                    params: { input: JSON.stringify(data) }
                }
            }
        }),
        getMuById: builder.query({
            query: ({ muId }) => {
                let trpcData = { muId: muId }
                return {
                    url: 'mu.getById',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getMusPaginated: builder.query({
            query: (data) => {
                // TODO: there are multiple params
                //let trpcData = {muId: muId}
                return {
                    url: 'mu.getManyPaginated',
                    method: 'GET',
                    params: { input: JSON.stringify(data) }
                }
            }
        }),
        getTransactions: builder.query({
            query: (args) => {
                const { data, headers } = args
                return {
                    headers,
                    url: 'transaction.getPaginatedTransactions',
                    method: 'GET',
                    params: { input: JSON.stringify(data) }
                }
            }
        }),
        getUpgrade: builder.query({
            query: ({ muId }) => {
                // TODO: there are multiple params
                let trpcData = { muId: muId }
                return {
                    url: 'upgrade.getUpgradeByTypeAndEntity',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getWorkers: builder.query({
            query: (data) => {
                return {
                    url: 'worker.getWorkers',
                    method: 'GET',
                    params: { input: JSON.stringify(data) }
                }
            }
        }),
        getWorkersTotal: builder.query({
            query: ({ userId }) => {
                let trpcData = { userId: userId }
                return {
                    url: 'worker.getTotalWorkers',
                    method: 'GET',
                    params: { input: JSON.stringify(trpcData) }
                }
            }
        }),
        getPartyById: builder.query({
            query: (data) => {
                return {
                    url: 'party.getById',
                    method: 'GET',
                    params: { input: JSON.stringify(data) }
                }
            }
        }),
        getJobOffersByNation: builder.query({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                let allUsers = []
                let { data, error } = await fetchWithBQ(`user.getUsersByCountry?input=${JSON.stringify(_arg)}`)
                if (error) return { error }
                allUsers = [...allUsers, ...data.result.data.items]
                let cursor = data.result.data.nextCursor
                while (cursor) {
                    const _argC = Object.assign({}, _arg, { cursor: cursor })
                    let { data, error } = await fetchWithBQ(`user.getUsersByCountry?input=${JSON.stringify(_argC)}`)
                    if (error) return { error }
                    allUsers = [...allUsers, ...data.result.data.items]
                    cursor = data.result.data.nextCursor
                }
                console.log(data, error, data.result.data.nextCursor)
                const allCompanies = []
                await Promise.all(allUsers.map(async (user) => {
                    const { data, error } = await fetchWithBQ(`company.getCompanies?input=${JSON.stringify({ userId: user._id })}`)
                    data && allCompanies.push(data.result.data.items)
                }));
                const companiesIds = allCompanies.flat()
                console.log(companiesIds)
                const allWorkOffers = []
                await Promise.all(companiesIds.map(async (companyId) => {
                    const { data, error } = await fetchWithBQ(`workOffer.getWorkOfferByCompanyId?input=${JSON.stringify({ companyId })}`)
                    data && allWorkOffers.push(data.result.data.items)
                }))
                console.log("all workoffers", allWorkOffers)
                return { data: allUsers }
            }
        }),
        getAnythingBatched: builder.query({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                //let fuck = await fetchWithBQ()
                const { endpoints, obj } = _arg
                const fuck = await fetchWithBQ(`${endpoints.join()}?batch=1&input=${encodeURI(JSON.stringify(obj))}`)
                return { data: fuck.data.map(x => x.result.data) }
            }
        }),
        getAnythingBatchedPost: builder.query({
            query: (arg) => {
                const { endpoints, obj } = arg
                return {
                    url: `${endpoints}?batch=1`,
                    method: 'POST',
                    body: obj
                }
            },
            transformResponse: (response) => {
                return response.map(x => x.result.data)
            }
        }),
    })
})

export const {
    useLazyGetCompanyByIdQuery,
    useLazyGetCompaniesQuery,
    useLazyGetCountryByIdQuery,
    useGetCountryByIdQuery,
    useLazyGetAllCountriesQuery,
    useGetAllCountriesQuery,
    useLazyGetEventsPaginatedQuery,
    useGetGovernmentByIdQuery,
    useLazyGetGovernmentByIdQuery,
    useLazyGetRegionByIdQuery,
    useGetRegionByIdQuery,
    useGetRegionsQuery,
    useLazyGetRegionsQuery,
    useLazyGetBattleByIdQuery,
    useLazyGetBattleLiveQuery,
    useLazyGetBattlesQuery,
    useLazyGetRoundByIdQuery,
    useLazyGetRoundLastHitsQuery,
    useLazyGetBattleRankingQuery,
    useLazyGetPricesQuery,
    useGetPricesQuery,
    useLazyGetTopOrdersQuery,
    useLazyGetItemOfferQuery,
    useLazyGetWorkOfferQuery,
    useLazyGetWorkOfferByCompanyQuery,
    useLazyGetWorkOffersPaginatedQuery,
    useLazyGetRankingQuery,
    useLazySearchAnythingQuery,
    useLazyGetGameDatesQuery,
    useLazyGetGameConfigQuery,
    useGetUserQuery,
    useLazyGetUserQuery,
    useLazyGetUsersByCountryQuery,
    useGetUsersByCountryQuery,
    useLazyGetArticleQuery,
    useLazyGetArticlesPaginatedQuery,
    useLazyGetMuByIdQuery,
    useGetMuByIdQuery,
    useLazyGetMusPaginatedQuery,
    useLazyGetTransactionsQuery,
    useLazyGetUpgradeQuery,
    useGetWorkersQuery,
    useLazyGetWorkersQuery,
    useLazyGetWorkersTotalQuery,
    useGetPartyByIdQuery,
    useLazyGetPartyByIdQuery,
    useLazyGetJobOffersByNationQuery,
    useLazyGetAnythingBatchedQuery,
    useLazyGetAnythingBatchedPostQuery
} = wareraApi