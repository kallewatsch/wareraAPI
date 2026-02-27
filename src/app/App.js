import React, { useEffect } from "react"
import {
    createHashRouter,
    RouterProvider
} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"
import { useGetAllCountriesQuery, useGetRegionsQuery } from "./api"
import { setCountries, setRegions } from "./appSlice"
import "./App.css"
import Search from "./components/search/Search"
import Countries from "./components/Countries"
import Regions from "./components/Regions"
import FreeMUs from "./components/FreeMUs"
import Navigation from "./components/Navigation"
import Home from "./components/Home"
import WarPlaner from "./components/warplaner/WarPlaner"
import LineChart from "./components/LineChart"
//import Market from "./components/market/Market"
import Intel from "./components/intel/Intel"
import WareraEvents from "./components/events/WareraEvents"
import CasesSimulator from "./components/CasesSimulator"

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
            element: <CasesSimulator caseCount={50} />
        },
    ]
)

export const App = () => {

    const { data: countries, countriesError } = useGetAllCountriesQuery()
    const { data: regions, error: regionsError } = useGetRegionsQuery()
    const { isLoading } = useSelector(state => state.app)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!countries) return;
        dispatch(setCountries(countries.result.data))
    }, [countries])

    useEffect(() => {
        if (!regions) return;
        dispatch(setRegions(regions.result.data))
    }, [regions])

    return (
        <>{isLoading && <div id="loadingSpinner" ><Spinner /></div>}
            <Container>
                <Navigation />
                <RouterProvider router={router} />
            </Container>
        </>
    )

}

export default App