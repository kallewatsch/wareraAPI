import { getUpgradesData } from "./upgradeStuff"
import { extendUser, getUsersAvailableDmg } from "./userStuff"

export const extendCountry = (country, extendedUsers, countryRegionUprades) => {

    const extendedUsersWithBan = extendedUsers.filter(user => user.infos?.isBanned)
    const extendedUsersWithoutBan = extendedUsers.filter(user => !user.infos?.isBanned)

    const totalAvailableCountryDmg = getUsersAvailableDmg(extendedUsersWithoutBan)
    const totalAvailableCountryDmgBan = getUsersAvailableDmg(extendedUsersWithBan)
    const totalAvailableCountryDmgTotal = getUsersAvailableDmg(extendedUsers)

    //const countryRegionIds = Object.keys(regions).filter(key => regions[key].country == country._id)
    //const countryRegionUprades = upgrades.filter(upgrade => countryRegionIds.some(regionId => regionId == upgrade.region))

    const bunkerUpgrades = countryRegionUprades.filter(upgrade => upgrade.upgradeType == "bunker")
    const baseUpgrades = countryRegionUprades.filter(upgrade => upgrade.upgradeType == "base")
    const pacificationCenterUpgrades = countryRegionUprades.filter(upgrade => upgrade.upgradeType == "pacificationCenter")

    const bunkers = getUpgradesData(bunkerUpgrades)
    const bases = getUpgradesData(baseUpgrades)
    const pacificationCenters = getUpgradesData(pacificationCenterUpgrades)

    return Object.assign(
        {},
        { ...country },
        {
            extended: {
                totalAvailableCountryDmg,
                totalAvailableCountryDmgBan,
                totalAvailableCountryDmgTotal,
                bunkers,
                bases,
                pacificationCenters,
                //extendedUsers
            }
        }
    )

}

export const extendCountries = (countries, users, regions, upgrades) => {
    return countries.map(country => {
        const extendedUsers = users
            .filter(user => user.country == country?._id)
            .map(user => extendUser(user))
        const countryRegionIds = Object.keys(regions).filter(key => regions[key].country == country._id)
        const countryRegionUprades = upgrades.filter(upgrade => countryRegionIds.some(regionId => regionId == upgrade.region))
        return extendCountry(country, extendedUsers, countryRegionUprades)
        
    })
}