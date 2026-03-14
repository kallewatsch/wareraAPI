import reducer, { initialState, addUsers, usersSlice as sl } from "../usersSlice"

describe("usersSlice", () => {
    let stateFilled, user1, user2, user3
    beforeAll(() => {
        user1 = { _id: '1' }
        user2 = { _id: '2' }
        user3 = { _id: '3' }
        stateFilled = [user1, user2, user3]
    })
    it("initialState", () => {
        expect(initialState).toEqual([])
    })
    it("should return initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })
    it("should handle setUsers", () => {
        expect(reducer(undefined, sl.actions.setUsers([user1, user2, user3]))).toEqual([user1, user2, user3])
    })
    /* it("should handle addUsers", () => {
        const payload1 = [{ _id: '1' }, { _id: '2' }], payload2 = [{ _id: '1' }, { _id: '4' }, { _id: '2' }]
        const expected1 = [], expected2 = [{ _id: '4' }]
        expect(reducer(stateFilled, addUsers({ userIds: payload1, chunksize: 800 }))).toEqual([...stateFilled, ...expected1])
        expect(reducer(stateFilled, addUsers({ userIds: payload2, chunksize: 800 }))).toEqual([...stateFilled, ...expected2])
    }) */
    it.each([
        { payload: [], expected: [] },
        { payload: [{ _id: '4' }], expected: [{ _id: '4' }] },
        { payload: [{ _id: '1' }, { _id: '2' }], expected: [] },
        /* { payload: [{ _id: '1' }, { _id: '4' }, { _id: '2' }], expected: [{ _id: '4' }] } */
    ])("state: $state addUser($payload) returns $expected", ({ payload, expected }) => {
        expect(reducer(stateFilled, addUsers({userIds: payload, chunksize: 800}))).toEqual([...stateFilled, ...expected])
    })
})