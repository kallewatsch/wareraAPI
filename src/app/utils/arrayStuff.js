export const getAllies = countries => {
    return countries.map(country => country.allies)
        .flat()
        .reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
}

export const getNations = (countries, idsFriendly, idsHostile) => {
    const nations = countries.filter(country => idsFriendly.some(id => id == country._id))
    const alliesIds = getAllies(nations)
    const alliesIdsClean = alliesIds.filter(item => idsHostile.every(id => id != item)).filter(item => idsFriendly.every(id => id != item))

    return [[...nations], [...countries.filter(country => alliesIdsClean.some(id => id == country._id))]]
}

export const getRemainigNations = (countries, attackers, defenders) => countries.filter(country =>
    attackers.every(id => id != country._id) && defenders.every(id => id != country._id)
)

export const getUniqueValuesByKey = (countries, key) => {
    return countries.map(country => country[key])
        .flat()
        .reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
}

export const getValueFromArrayItem = (arr, itemKey, val, target) => {
    const result = arr.find(item => item[itemKey] == val)
    return result[target] || val
}

export const sortByNameAsc = (a, b) => {
    return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
}

export const rankingValueToHumanReadable = (value) => {
    const intVal = parseInt(value)
    return isNaN(intVal) ? '-' : Math.round(intVal).toLocaleString()
}

export const rankingRankToHumanReadable = rank => {
    // hell awaits me for sure
    return !rank ? '-' : rank == 3 ? `${rank}rd` : rank == 2 ? `${rank}nd` : rank == 1 ? `${rank}st` : `${rank}th`
}

export const getRankingSum = (arr, key) => {
    return arr.reduce((acc, cur) => acc + (cur.rankings[key] ? cur.rankings[key].value : 0), 0)
}

export const sortCountryByRankingKey = (countries, key) => {
    return [...countries].sort((a, b) => {
        if (!a.rankings[key]) {
            return -1
        }
        if (!b.rankings[key]) {
            return 1
        }
        return a.rankings[key].value > b.rankings[key].value ? 1 : a.rankings[key].value < b.rankings[key].value ? -1 : 0
    })
}

export const getNonExcludedCountries = (countries, excludedIds) => {
    return countries.filter(country => excludedIds.every(id => id != country._id))
}

export const getFreeMUsByCountry = (mus, users) => {
    return mus.filter(mu => {
        const cond1 = mu.members.length < mu.activeUpgradeLevels.dormitories * 5
        const cond2 = users.some((user) => mu.user == user._id)
        return cond1 && cond2
    })
}