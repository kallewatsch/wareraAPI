import reducer, { initialState, configSlice as sl } from "../configSlice"

describe("configSlice", () => {
    it("initialState", () => {
        expect(initialState).toEqual({})
    })
    it("should return initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })
    it("should handle setConfig", () => {
        expect(reducer(undefined, sl.actions.setConfig({ foo: "bar" }))).toEqual({ foo: "bar" })
    })
})