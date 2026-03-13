import reducer, { initialState, isLoadingSlice as sl } from "../isLoadingSlice"

describe("isLoadingSlice", () => {
    it("initialState", () => {
        expect(initialState).toEqual(false)
    })
    it("should return initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })
    it("should handle setIsLoading", () => {
        expect(reducer(undefined, sl.actions.setIsLoading(true))).toEqual(true)
    })
})