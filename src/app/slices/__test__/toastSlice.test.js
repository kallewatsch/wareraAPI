import reducer, { initialState, toastSlice as sl } from "../toastSlice"

describe("toastSlice", () => {
    it("initialState", () => {
        expect(initialState).toEqual({ show: false, content: '', bg: 'danger' })
    })
    it("should return initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })
    it("should handle setToast", () => {
        expect(reducer(undefined, sl.actions.setToast({ content: "bar", show: true }))).toEqual({ content: "bar", show: true, bg: "danger" })
    })
})