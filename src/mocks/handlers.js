import { http, HttpResponse } from "msw"
import allCountriesResponse from "./responses/country.getAllCountries.json"

export const BASE_URL = "https://api2.warera.io/trpc"

export const handlers = [
    http.get(`${BASE_URL}/country.getAllCountries`, () => {
        return HttpResponse.json(allCountriesResponse)
    }),
    /* http.post('https://master.apis.dev.openstreetmap.org/api/0.6/changeset/:changesetId/upload', () => {
        return HttpResponse.text('')
    }),
    http.put('https://master.apis.dev.openstreetmap.org/api/0.6/changeset/:changesetId/close', () => {
        return HttpResponse.text('', { status: 200 })
    }) */
]

export default handlers