import React from "react"
import { useSelector } from "react-redux"
import App from "./App"
import ApiKeyModal from "./components/apikey/ApiKeyModal"


export const AppWrapper = (props) => {

    const { ready } = useSelector(state => state.app.apikey)

    return (
        <>{ready ? <App /> : <ApiKeyModal />}</>
    )
}


export default AppWrapper