import reducer, { initialState, warplanerSlice as sl } from "../warplanerSlice"

describe("warplanerSlice", () => {
    it("initialState", () => {
        expect(initialState).toEqual({
            attackers: {
                ids: [],
                countries: [],
                allies: [],
                excluded: []
            },
            defenders: {
                ids: [],
                countries: [],
                allies: [],
                excluded: []
            }
        })
    })
    it("should return initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })
    it("should handle setWarPlaner", () => {
        expect(reducer(undefined, sl.actions.setWarPlaner([1, 2, 3]))).toEqual([1, 2, 3])
    })
    it("should handle resetWarPlaner", () => {
        expect(reducer({ bla: "bla" }, sl.actions.resetWarPlaner())).toEqual(initialState)
    })
})