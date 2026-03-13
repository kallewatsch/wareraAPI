import reducer, { initialState, usersSlice as sl } from "../usersSlice"

describe("usersSlice", () => {
    it("initialState", () => {
        expect(initialState).toEqual([])
    })
    it("should return initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })
    it("should handle setUsers", () => {
        expect(reducer(undefined, sl.actions.setUsers([1, 2, 3]))).toEqual([1, 2, 3])
    })
    it("should handle addUsers", () => {
        expect(reducer([1, 2, 3], sl.actions.addUsers([4, 5]))).toEqual([1, 2, 3, 4, 5])
    })
})