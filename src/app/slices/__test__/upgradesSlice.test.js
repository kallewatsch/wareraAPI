import reducer, { initialState, upgradesSlice as sl } from "../upgradesSlice"

describe("upgradesSlice", () => {
    it("initialState", () => {
        expect(initialState).toEqual([])
    })
    it("should return initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })
    it("should handle setUpgrades", () => {
        expect(reducer(undefined, sl.actions.setUpgrades([1, 2, 3]))).toEqual([1, 2, 3])
    })
})