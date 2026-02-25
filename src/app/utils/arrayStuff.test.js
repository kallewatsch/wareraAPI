import {
    getAllies,
    getNations,
    getRemainigNations,
    getUniqueValuesByKey,
    getValueFromArrayItem,
    sortByNameAsc,
    rankingValueToHumanReadable,
    rankingRankToHumanReadable,
    getRankingSum,
    sortCountryByRankingKey,
    getNonExcludedCountries,
    getFreeMUsByCountry
} from "./arrayStuff"

describe("arrayStuff", () => {
    it("getAllies returns same values as getUniqueValuesByKey", () => {
        const arr = [{ allies: ['a', 'b'] }, { allies: 'a' }, { allies: [] }]
        expect(getAllies(arr)).toEqual(getUniqueValuesByKey(arr, 'allies'))
    })
    it("getNations", () => {
        const arr = [
            {
                _id: 'a'
            },
            {
                _id: 'b'
            }
        ]
        const ids1 = ['a']
        const ids2 = ['b']
        expect(getNations(arr, ids1, ids2)).toEqual([[{ _id: 'a' }], []])
    })
    it("getRemainingNations", () => {
        const arr = [
            {
                _id: 'a'
            },
            {
                _id: 'b'
            }
        ]
        const ids1 = ['a']
        const ids2 = ['b']
        expect(getRemainigNations(arr, ids1, ids2)).toEqual([])
    })
    it("getValueFromArrayItem target exists", () => {
        const arr = [
            { foo: 'bar', bla: 'blubb' },
            { foo: 'baz', bla: 'miau' }
        ]
        expect(getValueFromArrayItem(arr, 'foo', 'baz', 'bla')).toEqual('miau')
    })
    it("getValueFromArrayItem target doesn't exist", () => {
        const arr = [
            { foo: 'bar', bla: 'blubb' },
            { foo: 'baz', bla: 'miau' }
        ]
        expect(getValueFromArrayItem(arr, 'foo', 'baz', 'nope')).toEqual('baz')
    })
    it.each([
        [{ name: 'a' }, { name: 'b' }, -1],
        [{ name: 'b' }, { name: 'a' }, 1],
        [{ name: 'a' }, { name: 'a' }, 0]
    ])('sortByNameAsc(%i, %i)', (a, b, expected) => {
        expect(sortByNameAsc(a, b)).toEqual(expected)
    })
    it.each([
        [undefined, '-'],
        [null, '-'],
        [1, Math.round(1).toLocaleString()],
        [13337, Math.round(13337).toLocaleString()],
        [0, Math.round(0).toLocaleString()]
    ])('rankingValueToHumanReadable %s returns %s', (val, exp) => {
        expect(rankingValueToHumanReadable(val)).toEqual(exp)
    })
    it.each([
        [undefined, '-'],
        [null, '-'],
        [0, '-'],
        [1, '1st'],
        [2, '2nd'],
        [3, '3rd'],
        [4, '4th'],
        [1337, '1337th']
    ])('rankingRankToHumanReadable %s returns %s', (rank, exp) => {
        expect(rankingRankToHumanReadable(rank)).toEqual(exp)
    })
    it.each([
        { countries: [], key: 'foo', expected: 0 },
        {
            countries: [
                { rankings: { foo: { value: 40 } } },
                { rankings: { foo: undefined } },
                { rankings: { foo: { value: 2 } } }
            ],
            key: 'foo',
            expected: 42
        }
    ])('getRankingSum($countries) returns $expected', ({ countries, key, expected }) => {
        expect(getRankingSum(countries, key)).toEqual(expected)
    })
    it.each([
        { countries: [], key: 'foo', expected: [] },
        {
            countries: [
                { rankings: { foo: { value: 40 } } },
                { rankings: { foo: undefined } },
                { rankings: { foo: { value: 1 } } },
                { rankings: { foo: { value: 1 } } },
                { rankings: { foo: { value: 2 } } }
            ],
            key: 'foo',
            expected: [
                { rankings: { foo: undefined } },
                { rankings: { foo: { value: 1 } } },
                { rankings: { foo: { value: 1 } } },
                { rankings: { foo: { value: 2 } } },
                { rankings: { foo: { value: 40 } } }
            ]
        }
    ])('sortCountryByRankingKey($countries) returns $expected', ({ countries, key, expected }) => {
        expect(sortCountryByRankingKey(countries, key)).toEqual(expected)
    })
    it.each([
        { countries: [], exludedIds: [], expected: [] },
        {
            countries: [{ _id: 'foo' }, { _id: 'bar' }],
            exludedIds: ['foo'],
            expected: [{ _id: 'bar' }]
        }
    ])('getNonExcludedCountries($countries, $exludedIds) returns $expected', ({
        countries, exludedIds, expected
    }) => {
        expect(getNonExcludedCountries(countries, exludedIds)).toEqual(expected)
    })
    it.each([
        { mus: [], users: [], expected: [] },
        {
            mus: [
                {
                    members: [],
                    activeUpgradeLevels: { dormitories: 1 },
                    user: 'foo'
                }
            ],
            users: [{ _id: 'foo' }],
            expected: [
                {
                    members: [],
                    activeUpgradeLevels: { dormitories: 1 },
                    user: 'foo'
                }
            ]
        }
    ])('getFreeMUsByCountry($mus, $users) returns $expected', ({ mus, users, expected }) => {
        expect(getFreeMUsByCountry(mus, users)).toEqual(expected)
    })
})