import { http, HttpResponse } from "msw"
import allCountriesResponse from "./responses/country.getAllCountries.json"
import regionGetRegionsObjectResponse from "./responses/region.getRegionsObject.json"
import gameConfigGetDatesResponse from "./responses/gameConfig.getDates.json"
import gameConfigGetGameConfigResponse from "./responses/gameConfig.getGameConfig.json"
import eventGetEventsPaginatedMoneyResponse from "./responses/event.getEventsPaginatedMoney.json"
import transactionGetPaginatedTransactionsResponse from "./responses/transaction/transactionTradingNoPagination.json"

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
                    userIds: ["a", "b", "yxz"],
                    partyIds: []
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
export const eventHandlers = {
    getEventsPaginatedMoneyResponse: {
        success: http.get(`${BASE_URL}/country.getAllCountries`, () => {
            console.log('msw mock response, only working for germany')
            return HttpResponse.json(eventGetEventsPaginatedMoneyResponse)
        }),
    }
}

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

export const transactionHandlers = {
    getPaginatedTransactions: {
        success: http.get(`${BASE_URL}/transaction.getPaginatedTransactions`, async (args) => {
            console.log("dem args", args)
            const url = new URL(args.request.url)
            //const body = await args.request.clone().json()
            //const { data: { userId, cursor, limit } } = body
            const input = url.searchParams.get("input")

            const { userId, cursor, limit } = JSON.parse(input)

            console.log(userId, cursor, limit)

            const foo = transactionGetPaginatedTransactionsResponse

            const pageSize = 10;
            // 3. Determine start index
            // If no cursor, start at 0. Otherwise, parse cursor (e.g., as index)
            const startIndex = cursor ? parseInt(atob(cursor), 10) : 0;
            const endIndex = startIndex + pageSize;

            const blaId = "699db95c431033ab91554751"
            const fooItems = foo.result.data.items.map(x => {
                const meh = Object.assign({}, { ...x }, {
                    buyerId: x.buyerId == blaId ? userId : x.buyerId,
                    sellerId: x.sellerId == blaId ? userId : x.sellerId
                })
                return meh
            })

            // 4. Slice data
            const pageItems = fooItems.slice(startIndex, endIndex);

            // 5. Generate next cursor (using base64 to treat it as an opaque token)
            const nextCursor = endIndex < foo.result.data.items.length
                ? btoa(endIndex.toString())
                : null;

            const fooResponse = { "result": { "data": { "items": pageItems, "nextCursor": nextCursor } } }

            return HttpResponse.json(fooResponse)
        }),
    }
}

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
    gameConfigHandlers,
    eventHandlers,
    transactionHandlers
}

export default handlers