import { setupServer } from 'msw/node'
import handlers from './handlers' 

const myHandlers = [
    handlers.countryHandlers.getAllCountries.success,
    handlers.regionHandlers.getRegionsOject.success,
    handlers.gameConfigHandlers.getDates.success,
    handlers.gameConfigHandlers.getGameConfig.success,
    handlers.eventHandlers.getEventsPaginatedMoneyResponse.success,
    handlers.transactionHandlers.getPaginatedTransactions.success,
]

export const server = setupServer(...myHandlers)