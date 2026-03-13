import reducer, { initialState, countriesSlice as sl } from "../countriesSlice"

describe("countriesSlice", () => {
    it("initialState", () => {
        expect(initialState).toEqual([])
    })
    it("should return initialState", () => {
        expect(reducer(undefined, {})).toEqual([])
    })
    it("should handle setCountries", () => {
        expect(reducer(undefined, sl.actions.setCountries([1, 2, 3]))).toEqual([1, 2, 3])
    })
})