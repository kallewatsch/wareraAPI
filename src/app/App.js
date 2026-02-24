import React, { useEffect } from "react"
import {
    createHashRouter,
    RouterProvider
} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"
import { useGetAllCountriesQuery } from "./api"
import { setCountries } from "./appSlice"
import "./App.css"
import Search from "./components/search/Search"
import Companies from "./components/Companies"
import Countries from "./components/Countries"
import Events from "./components/Events"
import Governments from "./components/Governments"
import Regions from "./components/Regions"
import Battles from "./components/Battles"
import Rounds from "./components/Rounds"
import BattleRankings from "./components/BattleRankings"
import Prices from "./components/Prices"
import TradingOrders from "./components/TradingOrders"
import ItemOffers from "./components/ItemOffers"
import WorkOffers from "./components/WorkOffers"
import Rankings from "./components/Rankings"
import GameConfig from "./components/GameConfig"
import Articles from "./components/Articles"
import MUs from "./components/MUs"
import Transactions from "./components/Transactions"
import Upgrade from "./components/Upgrade"
import Workers from "./components/Workers"
import FreeMUs from "./components/FreeMUs"
import Navigation from "./components/Navigation"
import Home from "./components/Home"
import WarPlaner from "./components/warplaner/WarPlaner"
import LineChart from "./components/LineChart"
//import Market from "./components/market/Market"
import Intel from "./components/intel/Intel"

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
            path: "/companies",
            element: <Companies />
        },
        {
            path: "/countries",
            element: <Countries />
        },
        {
            path: "/events",
            element: <Events />
        },
        {
            path: "/governments",
            element: <Governments />
        },
        {
            path: "/regions",
            element: <Regions />
        },
        {
            path: "/battles",
            element: <Battles />
        },
        {
            path: "/rounds",
            element: <Rounds />
        },
        {
            path: "/battlerankings",
            element: <BattleRankings />
        },
        {
            path: "/prices",
            element: <Prices />
        },
        {
            path: "/tradingorders",
            element: <TradingOrders />
        },
        {
            path: "/itemoffers",
            element: <ItemOffers />
        },
        {
            path: "/workoffers",
            element: <WorkOffers />
        },
        {
            path: "/rankings",
            element: <Rankings />
        },
        {
            path: "/gameconfig",
            element: <GameConfig />
        },
        {
            path: "/articles",
            element: <Articles />
        },
        {
            path: "/mus",
            element: <MUs />
        },
        {
            path: "/transactions",
            element: <Transactions />
        },
        {
            path: "/upgrade",
            element: <Upgrade />
        },
        {
            path: "/workers",
            element: <Workers />
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
        }
    ]
)

export const App = () => {

    const { data: countries, error } = useGetAllCountriesQuery()
    const { isLoading } = useSelector(state => state.app)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!countries) return;
        dispatch(setCountries(countries.result.data))
    }, [countries])

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