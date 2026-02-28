import { http, HttpResponse } from "msw"
import allCountriesResponse from "./responses/country.getAllCountries.json"
import regionGetRegionsObjectResponse from "./responses/region.getRegionsObject.json"
import gameConfigGetDatesResponse from "./responses/gameConfig.getDates.json"
import gameConfigGetGameConfigResponse from "./responses/gameConfig.getGameConfig.json"

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

// new schema

export const companyHandlers = {
    getById: {},
    getCompanies: {}
}

export const countryHandlers = {
    getCountryById: {},
    getAllCountries: {
        success: http.get(`${BASE_URL}/country.getAllCountries`, () => {
            return HttpResponse.json(allCountriesResponse)
        }),
    }
}
export const eventHandlers = {}

export const governmentHandlers = {}

export const regionHandlers = {
    getRegionsOject: {
        success: http.get(`${BASE_URL}/region.getRegionsObject`, () => {
            return HttpResponse.json(regionGetRegionsObjectResponse)
        }),
    }
}

export const battleHandlers = {}

export const roundHandlers = {}

export const battleRankingHandlers = {}

export const itemTradingHandlers = {}

export const tradinOrderHandlers = {}

export const itemOfferHandlers = {}

export const workOfferHandlers = {}

export const rankingHandlers = {}

export const searchHandlers = {}


export const gameConfigHandlers = {
    getDates: {
        success: http.get(`${BASE_URL}/gameConfig.getDates`, () => {
            return HttpResponse.json(gameConfigGetDatesResponse)
        }),
    },
    getGameConfig: {
        success: http.get(`${BASE_URL}/gameConfig.getGameConfig`, () => {
            return HttpResponse.json(gameConfigGetGameConfigResponse)
        }),
    }
}

export const userHandlers = {}

export const articleHandlers = {}

export const muHandlers = {}

export const transactionHandlers = {}

export const upgradeHandlers = {}

export const workerHandlers = {}



export const handlers = {
    searchAnythingHandlers,
    getAllCountriesHandlers,
    getCountryByIdHandlers,
    getMuByIdHandlers,
    getRegionByIdHandlers,
    getUserByIdHandlers,
    // new schema
    countryHandlers,
    regionHandlers,
    gameConfigHandlers
}

export default handlers