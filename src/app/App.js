import React, { useEffect } from "react"
import { createHashRouter, RouterProvider } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getMus } from "./slices/musSlice"
import { getConfig } from "./slices/configSlice"
import { getRegions } from "./slices/regionsSlice"
import { getCountries } from "./slices/countriesSlice"
import { getUpgrades } from "./slices/upgradesSlice"
import { getUserIds } from "./slices/userIdsSlice"
import Container from "react-bootstrap/Container"
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
import SkillBuild from "./components/skillbuild/SkillBuild"
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
        {
            path: "/skillbuild",
            element: <SkillBuild />
        },
    ]
)

export const App = () => {

    const { countries, regions } = useSelector(state => state.app)
    const dispatch = useDispatch()

    const regionIds = Object.keys(regions).map(key => regions[key]._id)
    const countryIds = countries.map(country => country._id)

    const fooEffects = {
        loadConfig: true,
        loadRegions: true,
        loadCountries: true,
        loadRegionUpgrades: true,
        loadMusEffect: true,
        loadUsersEffect: true
    }
    useEffect(() => {
        if (fooEffects.loadConfig) {
            dispatch(getConfig())
        }
        if (fooEffects.loadRegions) {
            dispatch(getRegions())
        }
        if (fooEffects.loadCountries) {
            dispatch(getCountries())
        }
        if (fooEffects.loadMusEffect) {
            dispatch(getMus())
        }
    }, [])

    useEffect(() => {
        if (fooEffects.loadRegionUpgrades) {
            dispatch(getUpgrades({ regionIds }))
        }
    }, [regionIds.length])

    useEffect(() => {
        if (fooEffects.loadUsersEffect) {
            dispatch(getUserIds({ countryIds, chunksize: 900 }))
        }
    }, [countryIds.length])

    return (
        <>
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