import { setupWorker } from 'msw/browser'
import handlers from './handlers' 

const myHandlers = [
    handlers.countryHandlers.getAllCountries.success,
    handlers.regionHandlers.getRegionsOject.success,
    handlers.gameConfigHandlers.getDates.success,
    handlers.gameConfigHandlers.getGameConfig.success,
]

export const worker = setupWorker(...myHandlers)