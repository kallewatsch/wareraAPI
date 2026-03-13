import reducer, { initialState, musSlice as sl } from "../musSlice"

describe("musSlice", () => {
    it("initialState", () => {
        expect(initialState).toEqual([])
    })
    it("should return initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })
    it("should handle setMus", () => {
        expect(reducer(undefined, sl.actions.setMus([1, 2, 3]))).toEqual([1, 2, 3])
    })
})