import { http, HttpResponse } from "msw"
import allCountriesResponse from "./responses/country.getAllCountries.json"

export const BASE_URL = "https://api2.warera.io/trpc"

// TODO: more sophisticated handlers: take params into account, error handler


export const searchAnythingHandlers = {
    noDataHandler: http.get(`${BASE_URL}/search.searchAnything`, () => {
        return HttpResponse.json({
            hasData: false
        })
    }),
    hasDataHandler: http.get(`${BASE_URL}/search.searchAnything`, () => {
        return HttpResponse.json({
            result: {
                data: {
                    hasData: true,
                    countryIds: ["abc"],
                    muIds: ["asd", "bla"],
                    regionIds: [],
                    userIds: ["a", "b", "yxz"]
                }
            }
        })
    }),
    errorHandler: http.get(`${BASE_URL}/search.searchAnything`, () => {
        return HttpResponse.json(
            { error: 'Bad Request' },
            { status: 400 }
        )
    })
}

export const getAllCountriesHandlers = {
    allCountriesHandler: http.get(`${BASE_URL}/country.getAllCountries`, () => {
        return HttpResponse.json(allCountriesResponse)
    }),
    errorHandler: http.get(`${BASE_URL}/country.getAllCountries`, () => {
        return HttpResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    })
}

export const getCountryByIdHandlers = {
    defaultHandler: http.get(`${BASE_URL}/country.getCountryById`, () => {
        return HttpResponse.json({
            result: {
                data: {
                    _id: '123',
                    name: 'foo'
                }
            }
        })
    }),
    errorHandler: http.get(`${BASE_URL}/country.getCountryById`, () => {
        return HttpResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    })
}

export const getMuByIdHandlers = {
    defaultHandler: http.get(`${BASE_URL}/mu.getById`, () => {
        return HttpResponse.json({
            result: {
                data: {
                    _id: '123',
                    name: 'foo'
                }
            }
        })
    }),
    errorHandler: http.get(`${BASE_URL}/mu.getById`, () => {
        return HttpResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    })
}

export const getRegionByIdHandlers = {
    defaultHandler: http.get(`${BASE_URL}/region.getById`, () => {
        return HttpResponse.json({
            result: {
                data: {
                    _id: '123',
                    name: 'foo'
                }
            }
        })
    }),
    errorHandler: http.get(`${BASE_URL}/region.getById`, () => {
        return HttpResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    })
}

export const getUserByIdHandlers = {
    defaultHandler: http.get(`${BASE_URL}/user.getUserLite`, () => {
        return HttpResponse.json({
            result: {
                data: {
                    _id: '123',
                    username: 'foo'
                }
            }
        })
    }),
    errorHandler: http.get(`${BASE_URL}/user.getUserLite`, () => {
        return HttpResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    })
}

export const handlers = {
    searchAnythingHandlers,
    getAllCountriesHandlers,
    getCountryByIdHandlers,
    getMuByIdHandlers,
    getRegionByIdHandlers,
    getUserByIdHandlers
}

export default handlers