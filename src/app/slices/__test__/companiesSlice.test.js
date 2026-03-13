import reducer, { initialState, companiesSlice as sl } from "../companiesSlice"

describe("companiesSlice", () => {
    it("initialState", () => {
        expect(initialState).toEqual([])
    })
    it("should return initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })
    it("should handle setCompanies", () => {
        expect(reducer(undefined, sl.actions.setCompanies([1, 2, 3]))).toEqual([1, 2, 3])
    })
})