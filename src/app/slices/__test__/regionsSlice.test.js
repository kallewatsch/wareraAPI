import reducer, { initialState, regionsSlice as sl } from "../regionsSlice"

describe("regionsSlice", () => {
    it("initialState", () => {
        expect(initialState).toEqual({})
    })
    it("should return initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })
    it("should handle setIsLoading", () => {
        expect(reducer(undefined, sl.actions.setRegions({ foo: "bar" }))).toEqual({ foo: "bar" })
    })
})