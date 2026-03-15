import React, { useEffect } from "react"
import { createHashRouter, RouterProvider } from "react-router-dom"
import { useDispatch } from "react-redux"
import Container from "react-bootstrap/Container"
import { useGetAllCountriesQuery, useGetGameConfigQuery, useGetRegionsQuery, useLazyGetAnythingBatchedPostQuery, useLazyGetMusPaginatedQuery } from "./api"
import { setConfig, setCountries, setIsLoading, setIsLoadingFulFilled, setIsLoadingPending, setIsLoadingRejected, setMus, setRegions, setToast, setUpgrades, setUserIds } from "./appSlice"
import Search from "./components/search/Search"
import Countries from "./components/Countries"
//import Companies from "./components/companies/Companies"
import Regions from "./components/Regions"
import FreeMUs from "./components/FreeMUs"
import Navigation from "./components/Navigation"
import Home from "./components/Home"
import WarPlaner from "./components/warplaner/WarPlaner"
import LineChart from "./components/LineChart"
//import Market from "./components/market/Market"
import Intel from "./components/intel/Intel"
import WareraEvents from "./components/events/WareraEvents"
import CasesSimulator from "./components/cases/CasesSimulator"
import ToastContainer from "./components/ToastContainer"
import WorldUsers from "./components/WorldUsers"
import LoadingSpinner from "./components/LoadingSpinner"
import "./App.css"

const router = createHashRouter(
    [
        /* {
            path: '*',
            element: <ErrorPage />
        }, */
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/freemus",
            element: <FreeMUs />
        },
        {
            path: "/search",
            element: <Search />
        },
        {
            path: "/countries",
            element: <Countries />
        },
        /* {
            path: "/companies",
            element: <Companies />
        }, */
        {
            path: "/regions",
            element: <Regions />
        },
        {
            path: "/warplaner",
            element: <WarPlaner />
        },
        {
            path: "/miau",
            element: <LineChart />
        },
        /* {
            path: "/market",
            element: <Market />
        }, */
        {
            path: "/intel",
            element: <Intel />
        },
        {
            path: "/events",
            element: <WareraEvents />
        },
        {
            path: "/cases",
            element: <CasesSimulator caseCount={100} />
        },
        {
            path: "/worldusers",
            element: <WorldUsers />
        },
    ]
)

export const App = () => {

    const { data: countriesData, error: countriesError, isLoading: countriesIsLoading } = useGetAllCountriesQuery()
    const { data: regionsData, error: regionsError, isLoading: regionsIsLoading } = useGetRegionsQuery()
    const { data: configData, error: configError, isLoading: configIsLoading } = useGetGameConfigQuery()
    const [getMUsPaginated] = useLazyGetMusPaginatedQuery()
    const [getAnythingBatched] = useLazyGetAnythingBatchedPostQuery() //useLazyGetAnythingBatchedQuery() // if it won't properly change back to GET
    //const { isLoading } = useSelector(state => state.app)
    const dispatch = useDispatch()

    // TODO: calculate and check if url is below max size. check POST body aswell
    const CHUNKSIZES = {
        'GET': [100, 200],
        'POST': [800, 800]
    }

    const fooEffects = {
        loadRegionUpgrades: true,
        loadMusEffect: true,
        loadUsersEffect: true
    }

    useEffect(() => {
        if (configIsLoading) {
            dispatch(setIsLoadingPending({ request: { requestId: "initialLoadConfig", type: "config", items: 1 } }))
            return
        }
        try {
            if (configError) {
                dispatch(setIsLoadingRejected({ request: { requestId: "initialLoadConfig", type: "config" } }))
                dispatch(setToast({ show: true, content: JSON.stringify(configError, null, 2), bg: "danger" }))

            } else {
                dispatch(setIsLoadingFulFilled({ request: { requestId: "initialLoadConfig", type: "config" } }))
                const { result: { data: config } } = configData
                dispatch(setConfig(config))
            }
        } catch (err) {
            dispatch(setIsLoadingRejected({ request: { requestId: "initialLoadConfig", type: "config" } }))
            dispatch(setToast({ show: true, content: JSON.stringify(err, null, 2), bg: "danger" }))
        }
    }, [configIsLoading])

    useEffect(() => {
        if (regionsIsLoading) {
            dispatch(setIsLoadingPending({ request: { requestId: "initialLoadRegions", type: "regions", items: 1 } }))
            return
        }
        try {
            if (regionsError) {
                dispatch(setIsLoadingRejected({ request: { requestId: "initialLoadRegions", type: "regions" } }))
                dispatch(setToast({ show: true, content: JSON.stringify(configError, null, 2), bg: "danger" }))

            } else {
                const { result: { data: regions } } = regionsData
                dispatch(setIsLoadingFulFilled({ request: { requestId: "initialLoadRegions", type: "regions" } }))
                dispatch(setRegions(regions))
            }

        } catch (err) {
            dispatch(setIsLoadingRejected({ request: { requestId: "initialLoadRegions", type: "regions" } }))
            dispatch(setToast({ show: true, content: JSON.stringify(err, null, 2), bg: "danger" }))
        }
    }, [regionsIsLoading])

    useEffect(() => {
        if (countriesIsLoading) {
            dispatch(setIsLoadingPending({ request: { requestId: "initialLoadCountries", type: "countries", items: 1 } }))
            return
        }
        try {
            if (countriesError) {
                dispatch(setIsLoadingRejected({ request: { requestId: "initialLoadCountries", type: "countries" } }))
                dispatch(setToast({ show: true, content: JSON.stringify(countriesError, null, 2), bg: "danger" }))

            } else {
                const { result: { data: countries } } = countriesData
                dispatch(setIsLoadingFulFilled({ request: { requestId: "initialLoadCountries", type: "countries" } }))
                dispatch(setCountries(countries))
            }

        } catch (err) {
            dispatch(setIsLoadingRejected({ request: { requestId: "initialLoadCountries", type: "countries" } }))
            dispatch(setToast({ show: true, content: JSON.stringify(err, null, 2), bg: "danger" }))
        }
    }, [countriesIsLoading])

    useEffect(() => {
        if (!fooEffects.loadRegionUpgrades) return;
        if (!regionsData) return;
        const asyncFunc = async () => {
            dispatch(setIsLoadingPending({ request: { requestId: "initialLoadRegionUpgrades", type: "regionUpgrades", items: 1 } }))
            try {
                //const { result: { data: regions } } = regionsData
                const regions = regionsData?.result?.data
                const regionIds = Object.keys(regions).map(key => regions[key]._id)
                let allUpgrades = []

                const ep = 'upgrade.getUpgradeByTypeAndEntity'
                while (regionIds.length) {

                    const chunk = regionIds.splice(0, 400)

                    const obj1 = Object.fromEntries(chunk.map((id, i) => [i, { regionId: id, upgradeType: "bunker" }]))
                    const obj2 = Object.fromEntries(chunk.map((id, i) => [i, { regionId: id, upgradeType: "base" }]))
                    const obj3 = Object.fromEntries(chunk.map((id, i) => [i, { regionId: id, upgradeType: "pacificationCenter" }]))
                    const payload1 = {
                        endpoints: chunk.map(item => ep),
                        obj: obj1
                    }
                    const payload2 = {
                        endpoints: chunk.map(item => ep),
                        obj: obj2
                    }
                    const payload3 = {
                        endpoints: chunk.map(item => ep),
                        obj: obj3
                    }
                    const bunkersResult = await getAnythingBatched(payload1).unwrap()
                    const basesResult = await getAnythingBatched(payload2).unwrap()
                    const pacificationCentersResult = await getAnythingBatched(payload3).unwrap()

                    allUpgrades = [...allUpgrades, ...bunkersResult, ...basesResult, ...pacificationCentersResult]
                }
                const allUpgradesFlat = allUpgrades.flat()
                dispatch(setIsLoadingFulFilled({ request: { requestId: "initialLoadRegionUpgrades", type: "regionUpgrades", items: 1 } }))
                dispatch(setUpgrades(allUpgradesFlat))

            } catch (err) {
                console.log(err)
                dispatch(setIsLoadingRejected({ request: { requestId: "initialLoadRegionUpgrades", type: "regionUpgrades", items: 1 } }))
                dispatch(setToast({ show: true, content: JSON.stringify(err, null, 2), bg: "danger" }))
            }
        }
        asyncFunc()
    }, [regionsIsLoading])

    useEffect(() => {
        if (!fooEffects.loadMusEffect) return;
        const asyncGetMus = async () => {
            dispatch(setIsLoadingPending({ request: { requestId: "initialLoadMus", type: "mus", items: 1 } }))
            try {
                let { result: { data: { items, nextCursor }, error } } = await getMUsPaginated({ limit: 100 }).unwrap()
                let allItems = [...items]
                while (nextCursor) {
                    let { result: { data: moreData }, error } = await getMUsPaginated({ cursor: nextCursor, limit: 100 }).unwrap()
                    allItems = [...allItems, ...moreData.items]
                    nextCursor = moreData.nextCursor
                }
                dispatch(setIsLoadingFulFilled({ request: { requestId: "initialLoadMus", type: "mus", items: 1 } }))
                dispatch(setMus(allItems))
            } catch (err) {
                dispatch(setIsLoadingRejected({ request: { requestId: "initialLoadMus", type: "mus", items: 1 } }))
                dispatch(setToast({ show: true, content: JSON.stringify(err, null, 2), bg: "danger" }))
            }
        }
        asyncGetMus()
    }, [])

    // TODO: proper variable names
    useEffect(() => {
        if (!fooEffects.loadUsersEffect) return;
        if (countriesIsLoading) {
            dispatch(setIsLoadingPending({ request: { requestId: "initialLoadUserIds", type: "userIds", items: 1 } }))
            return
        }
        const asyncGetWorldUsers = async () => {
            try {
                const method = 'POST'
                dispatch(setIsLoading(true))
                const { result: { data: countries } } = countriesData
                const startedAt = Date.now()
                const countryIds = countries.map(x => x._id)
                const ep = 'user.getUsersByCountry'

                let allCountryUserIds = []
                const fuckIds = [...countryIds]

                while (fuckIds.length) {
                    const chunk = fuckIds.splice(0, CHUNKSIZES[method][0])
                    const obj = Object.fromEntries(chunk.map((val, i) => [i, { countryId: val, limit: 100 }]))
                    const payloadPost = {
                        endpoints: chunk.map(item => ep),
                        obj: obj
                    }
                    const someCountryUsers = await getAnythingBatched(payloadPost).unwrap()
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
                    const moreCountryUsers = await getAnythingBatched(payloadPost2).unwrap()
                    const fuck2 = moreCountryUsers.map((x, i) => ({ countryId: obj2[i]?.countryId, ...x }))
                    const moreBlaUsersByCountry = fuck2.map(x => ({ countryId: x.countryId, users: x.items.map(item => item._id) }))
                    let moreWorldUserIds = fuck2.map(x => x.items.map(item => item._id)).flat()

                    worldUserIds = [...worldUserIds, ...moreWorldUserIds]
                    blaUsersByCountry = [...blaUsersByCountry, moreBlaUsersByCountry]
                    const shit = moreCountryUsers.map((x, i) => ({ countryId: obj2[i]?.countryId, ...x }))

                    countryUserIds = shit.filter(item => item.nextCursor)
                }
                const foobar = Object.groupBy(blaUsersByCountry.flat(), ({ countryId }) => countryId)
                const baz = Object.keys(foobar).flatMap(countryId => {
                    return foobar[countryId].flatMap(x => x.users).map(userId => ({ countryId, userId }))
                })
                dispatch(setIsLoadingFulFilled({ request: { requestId: "initialLoadUserIds", type: "userIds", items: 1 } }))
                dispatch(setUserIds(baz))
                const finishedAt = Date.now()
                console.log(`finished after ${(finishedAt - startedAt) / 1000} seconds`)

            } catch (err) {
                console.log(err)
                dispatch(setIsLoadingRejected({ request: { requestId: "initialLoadUserIds", type: "userIds", items: 1 } }))
                dispatch(setToast({ show: true, content: 'Whoops', bg: "danger" }))
            }
            /* finally {
                dispatch(setIsLoading(false))
            } */
        }
        asyncGetWorldUsers()
    }, [countriesIsLoading])

    return (
        <>{/* {isLoading && <div id="loadingSpinner" >Loading... <i>Initial Load might take some time</i><Spinner /></div>} */}
            <LoadingSpinner />
            <Container>
                <Navigation />
                <ToastContainer />
                <RouterProvider router={router} />
            </Container>
        </>
    )

}

export default App