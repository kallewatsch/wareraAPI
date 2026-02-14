import { getAllies, getUniqueValuesByKey } from "./arrayStuff"

describe("arrayStuff", () => {
    it("getAllies returns same values as getUniqueValuesByKey", () => {
        const arr = [{allies: ['a', 'b']}, {allies: 'a'}, {allies: []}]
        expect(getAllies(arr)).toEqual(getUniqueValuesByKey(arr, 'allies'))
    })
})