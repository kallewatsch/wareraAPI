import React, { useEffect } from "react"
import { createHashRouter, RouterProvider } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"
import { useGetAllCountriesQuery, useGetGameConfigQuery, useGetRegionsQuery, useLazyGetMusPaginatedQuery } from "./api"
import { setConfig, setCountries, setMus, setRegions, setToast } from "./appSlice"
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
    ]
)

export const App = () => {

    const { data: countriesData, error: countriesError, isLoading: countriesIsLoading } = useGetAllCountriesQuery()
    const { data: regionsData, error: regionsError, isLoading: regionsIsLoading } = useGetRegionsQuery()
    const { data: configData, error: configError, isLoading: configIsLoading } = useGetGameConfigQuery()
    const [getMUsPaginated] = useLazyGetMusPaginatedQuery()
    const { isLoading } = useSelector(state => state.app)
    const dispatch = useDispatch()

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

    return (
        <>{isLoading && <div id="loadingSpinner" ><Spinner /></div>}
            <Container>
                <Navigation />
                <ToastContainer />
                <RouterProvider router={router} />
            </Container>
        </>
    )

}

export default App