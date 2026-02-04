import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useLazyGetMuByIdQuery, useLazyGetCompanyByIdQuery } from "./api"
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
import Users  from "./components/Users"
import Articles from "./components/Articles"
import MUs from "./components/MUs"
import Transactions from "./components/Transactions"
import Upgrade from "./components/Upgrade"
import Workers from "./components/Workers"
import FreeGermanMUs from "./components/FreeGermanMUs"

export const App = () => {
    const [getMuById] = useLazyGetMuByIdQuery()
    const [getCompanyById] = useLazyGetCompanyByIdQuery()
    const dataState = useSelector(state => state.app)



    return <>
        <Companies />
        <Countries />
        <Events />
        <Governments />
        <Regions />
        <Battles />
        <Rounds />
        <BattleRankings />
        <Prices />
        <TradingOrders />
        <ItemOffers />
        <WorkOffers />
        <Rankings />
        <GameConfig />
        <Users />
        <Articles />
        <MUs />
        <Transactions />
        <Upgrade />
        <Workers />
        <textarea value={JSON.stringify(dataState.data, null, 2)} cols="80" rows="20" style={{ "width": "100%" }} readOnly/>
        <div style={{"textAlign": "center"}}><FreeGermanMUs /></div>
    </>
}

export default App