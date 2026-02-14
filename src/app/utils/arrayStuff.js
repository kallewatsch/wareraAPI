export const getAllies = countries => {
    return countries.map(country => country.allies)
        .flat()
        .reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
}

export const getUniqueValuesByKey = (countries, key) => {
    return countries.map(country => country[key])
        .flat()
        .reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
}