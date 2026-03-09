import { setupWorker } from 'msw/browser'
import handlers from './handlers'

const myHandlers = [
    handlers.countryHandlers.getAllCountries.success,
    handlers.regionHandlers.getRegionsOject.success,
    handlers.gameConfigHandlers.getDates.success,
    handlers.gameConfigHandlers.getGameConfig.success,
    handlers.eventHandlers.getEventsPaginatedMoneyResponse.success,
    handlers.transactionHandlers.getPaginatedTransactions.success,
    handlers.battleHandlers.getBattles.success,
    handlers.battleHandlers.getById.success,
    handlers.battleHandlers.getLiveBattleData.success,
    //handlers.userHandlers.POST.getUsersByCountry.success,
    handlers.batchHandlers.GET.getAnythingBatched.success,
    handlers.batchHandlers.POST.getAnythingBatched.success,
    //handlers.batchHandlers.POST.getAnythingBatchedUserLite.success,
    handlers.upgradeHandlers.POST.getUpgradeByTypeAndEntity.success,
    handlers.muHandlers.GET.getManyPaginated.success,
]

export const worker = setupWorker(...myHandlers)