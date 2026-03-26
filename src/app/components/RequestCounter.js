import React from "react"
import { selectRequestLastMinute } from "../slices/loadingSlice"
import { useSelector } from "react-redux"
import { GiTrafficLightsGreen, GiTrafficLightsOrange, GiTrafficLightsRed } from "react-icons/gi"


export const RequestCounter = (props) => {

    const { rateLimit } = useSelector(state => state.app.apikey)

    const now = Date.now()
    const minute = 60 * 1000
    const requestsMinuteAgo = useSelector(state => selectRequestLastMinute(state.app, now - minute))
    const requestCountMinute = requestsMinuteAgo?.length || 0

    const thresholdWarn = rateLimit * 0.8
    const thresholdDanger = rateLimit

    const icon = requestCountMinute >= thresholdDanger
        ? <GiTrafficLightsRed size="2em" color="red" />
        : requestCountMinute >= thresholdWarn
            ? <GiTrafficLightsOrange size="2em" color="orange" />
            : <GiTrafficLightsGreen size="2em" color="green" />

    return <span>{icon} Requests Minute: {requestCountMinute}/{rateLimit}</span>

}


export default RequestCounter