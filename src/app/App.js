import React, { useEffect } from "react"
import { createHashRouter, RouterProvider } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"
import { useGetAllCountriesQuery, useGetGameConfigQuery, useGetRegionsQuery, useLazyGetAnythingBatchedPostQuery, useLazyGetAnythingBatchedQuery, useLazyGetMusPaginatedQuery } from "./api"
import { setConfig, setCountries, setIsLoading, setMus, setRegions, setToast, setUsers } from "./appSlice"
import Search from "./components/search/Search"
import Countries from "./components/Countries"
import Companies from "./components/companies/Companies"
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
        {
            path: "/companies",
            element: <Companies />
        },
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
    const { isLoading } = useSelector(state => state.app)
    const dispatch = useDispatch()

    // TODO: calculate and check if url is below max size. check POST body aswell
    const CHUNKSIZES = {
        'GET': [100, 200],
        'POST': [800, 800]
    }

    useEffect(() => {
        if (configIsLoading) return;
        try {
            if (configError) {
                dispatch(setToast({ show: true, content: JSON.stringify(configError, null, 2), bg: "danger" }))

            } else {
                const { result: { data: config } } = configData
                dispatch(setConfig(config))
            }

        } catch (err) {
            dispatch(setToast({ show: true, content: JSON.stringify(err, null, 2), bg: "danger" }))
        }
    }, [configIsLoading])

    useEffect(() => {
        if (regionsIsLoading) return;
        try {
            if (regionsError) {
                dispatch(setToast({ show: true, content: JSON.stringify(configError, null, 2), bg: "danger" }))

            } else {
                const { result: { data: regions } } = regionsData
                dispatch(setRegions(regions))
            }

        } catch (err) {
            dispatch(setToast({ show: true, content: JSON.stringify(err, null, 2), bg: "danger" }))
        }
    }, [regionsIsLoading])

    useEffect(() => {
        if (countriesIsLoading) return;
        try {
            if (countriesError) {
                dispatch(setToast({ show: true, content: JSON.stringify(configError, null, 2), bg: "danger" }))

            } else {
                const { result: { data: countries } } = countriesData
                dispatch(setCountries(countries))
            }

        } catch (err) {
            dispatch(setToast({ show: true, content: JSON.stringify(err, null, 2), bg: "danger" }))
        }
    }, [countriesIsLoading])

    useEffect(() => {
        const asyncGetMus = async () => {
            try {
                let { result: { data: { items, nextCursor }, error } } = await getMUsPaginated({ limit: 100 }).unwrap()
                let allItems = [...items]
                while (nextCursor) {
                    let { result: { data: moreData }, error } = await getMUsPaginated({ cursor: nextCursor, limit: 100 }).unwrap()
                    allItems = [...allItems, ...moreData.items]
                    nextCursor = moreData.nextCursor
                }
                dispatch(setMus(allItems))
            } catch (err) {
                dispatch(setToast({ show: true, content: JSON.stringify(err, null, 2), bg: "danger" }))
            }
        }
        asyncGetMus()
    }, [])

    useEffect(() => {
        if (countriesIsLoading) return;
        const asyncGetWorldUsers = async () => {
            try {
                const method = 'POST'
                dispatch(setIsLoading(true))
                const { result: {data: countries}} = countriesData
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

                let worldUserIds = allCountryUserIds.map(x => x.items.map(item => item._id)).flat()

                let incompleteCountryUserIds = allCountryUserIds.filter(item => item.nextCursor) // [{id: 'abc', items: [], nextCursor}]

                while (incompleteCountryUserIds.length) {
                    const obj2 = Object.fromEntries(incompleteCountryUserIds.map((val, i) => [i, { countryId: val.countryId, limit: 100, cursor: val.nextCursor }]))
                    const payloadPost2 = {
                        endpoints: incompleteCountryUserIds.map(item => ep),
                        obj: obj2
                    }
                    const moreCountryUsers = await getAnythingBatched(payloadPost2).unwrap()
                    const fuck2 = moreCountryUsers.map((x, i) => ({ countryId: obj2[i]?.countryId, ...x }))
                    let moreWorldUserIds = fuck2.map(x => x.items.map(item => item._id)).flat()

                    worldUserIds = [...worldUserIds, ...moreWorldUserIds]
                    const shit = moreCountryUsers.map((x, i) => ({ countryId: obj2[i]?.countryId, ...x }))

                    incompleteCountryUserIds = shit.filter(item => item.nextCursor)
                }

                let allUsers = []
                const ep3 = 'user.getUserLite'
                while (worldUserIds.length) {
                    const chunk = worldUserIds.splice(0, CHUNKSIZES[method][1])
                    //console.log(worldUserIds, chunk)
                    const payloadPost = {
                        endpoints: chunk.map(item => ep3),
                        obj: Object.fromEntries(chunk.map((val, i) => [i, { userId: val }]))
                    }
                    const someUsers = await getAnythingBatched(payloadPost).unwrap()
                    allUsers = [...allUsers, ...someUsers]
                }
                //const bla = Object.fromEntries(countryIds.map(id => [id, [...allUsers.filter(user => user.country == id)]]))
                const finishedAt = Date.now()
                console.log(`finished after ${(finishedAt - startedAt) / 1000} seconds`)
                //console.log("bla", bla)
                //console.log(allUsers)
                //dispatch(setWorldUsers(bla))
                dispatch(setUsers(allUsers))

            } catch (err) {
                console.log(err)
                dispatch(setToast({ show: true, content: 'Whoops', bg: "danger" }))
            }
            finally {
                dispatch(setIsLoading(false))
            }
        }
        asyncGetWorldUsers()
    }, [countriesIsLoading])

    return (
        <>{isLoading && <div id="loadingSpinner" >Loading... <i>Initial Load might take some time</i><Spinner /></div>}
            <Container>
                <Navigation />
                <ToastContainer />
                <RouterProvider router={router} />
            </Container>
        </>
    )

}

export default App