import React from "react"
import {
    createHashRouter,
    RouterProvider
} from "react-router-dom"
import { useSelector } from "react-redux"
import Search from "./components/Search"
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
import Users from "./components/Users"
import Articles from "./components/Articles"
import MUs from "./components/MUs"
import Transactions from "./components/Transactions"
import Upgrade from "./components/Upgrade"
import Workers from "./components/Workers"
import FreeGermanMUs from "./components/FreeGermanMUs"
import Navigation from "./components/Navigation"

const router = createHashRouter(
    [
        /* {
            path: '*',
            element: <ErrorPage />
        }, */
        {
            path: "/",
            element: <FreeGermanMUs />
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
            path: "/users",
            element: <Users />
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
        }
    ]
)

export const App = () => {

    const dataState = useSelector(state => state.app)

    return <>
        <Navigation />
        <RouterProvider router={router} />
        <textarea value={JSON.stringify(dataState.data, null, 2)} cols="80" rows="20" style={{ "width": "100%" }} readOnly />
        </>
}

export default App