import reducer, { initialState, userIdsSlice as sl } from "../userIdsSlice"

describe("userIdsSlice", () => {
    it("initialState", () => {
        expect(initialState).toEqual([])
    })
    it("should return initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })
    it("should handle setUpgrades", () => {
        expect(reducer(undefined, sl.actions.setUserIds([1, 2, 3]))).toEqual([1, 2, 3])
    })
})