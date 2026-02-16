import {
    getAllies,
    getNations,
    getRemainigNations,
    getUniqueValuesByKey,
    getValueFromArrayItem,
    sortByNameAsc
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
})