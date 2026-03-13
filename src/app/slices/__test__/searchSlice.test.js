import reducer, { initialState, searchSlice as sl } from "../searchSlice"

describe("searchSlice", () => {
    it("initialState", () => {
        expect(initialState).toEqual({})
    })
    it("should return initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })
    it("should handle setIsLoading", () => {
        expect(reducer(undefined, sl.actions.setSearchResult({ foo: "bar" }))).toEqual({ foo: "bar" })
    })
})