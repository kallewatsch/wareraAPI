import reducer, {
    initialState,
    setData,
    setFreeMUs,
    setCountries,
    addMus,
    setIsLoading,
    setUsers,
    addUsers,
    setRegions,
    setCompanies,
    setWarPlaner,
    resetWarPlaner
} from "./appSlice"

describe("appSlice", () => {
    it("initialState has expected structure and values", () => {
        expect(initialState).toEqual({
            data: 'miau',
            freeMUs: [],
            countries: [],
            mus: [],
            isLoading: false,
            users: [],
            regions: [],
            search: {},
            companies: [],
            warplaner: {
                attackers: {
                    ids: [],
                    countries: [],
                    allies: []
                },
                defenders: {
                    ids: [],
                    countries: [],
                    allies: []
                }
            }
        })
    })
    it("should return initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })
    it("should handle setData", () => {
        let foo = { bar: 'baz' }
        expect(reducer(initialState, setData(foo))).toEqual({
            ...initialState,
            data: foo
        })
    })
    it("should handle setFreeMUs", () => {
        const mus = []
        expect(reducer(initialState, setFreeMUs(mus))).toEqual({
            ...initialState,
            freeMUs: mus
        })
    })
    it("should handle setCountries", () => {
        const data = [{ foo: 'bar' }, { abc: '123' }]
        expect(reducer(initialState, setCountries(data))).toEqual({
            ...initialState,
            countries: data
        })
    })
    it("should handle addMus", () => {
        const data = [{ foo: 'bar' }, { abc: '123' }]
        expect(reducer(initialState, addMus(data))).toEqual({
            ...initialState,
            mus: data
        })
    })
    it("should handle setIsLoading", () => {
        expect(reducer(initialState, setIsLoading(true))).toEqual({
            ...initialState,
            isLoading: true
        })
    })
    it("should handle setUsers", () => {
        const data = [{ foo: 'bar' }, { abc: '123' }]
        expect(reducer(initialState, setUsers(data))).toEqual({
            ...initialState,
            users: data
        })
    })
    it("should handle addUsers", () => {
        const existingUsers = [{ foo: 'bar' }, { abc: '123' }]
        const data = [{ bla: 'bla' }]
        const state = Object.assign({}, { ...initialState }, { users: existingUsers })
        expect(reducer(state, addUsers(data))).toEqual({
            ...initialState,
            users: [...existingUsers, ...data]
        })
    })
    it("should handle setRegions", () => {
        const data = [{ foo: 'bar' }, { abc: '123' }]
        expect(reducer(initialState, setRegions(data))).toEqual({
            ...initialState,
            regions: data
        })
    })
    it("should handle setCompanies", () => {
        const data = [{ foo: 'bar' }, { abc: '123' }]
        expect(reducer(initialState, setCompanies(data))).toEqual({
            ...initialState,
            companies: data
        })
    })
    it("should handle setWarPlaner", () => {
        const data = {
            attackers: { ids: ['1', '42'], countires: [{ foo: 'bar' }, { abc: '123' }] },
            defenders: { ids: ['69'], countries: [{bla: 'bla'}]}
        }
        expect(reducer(initialState, setWarPlaner(data))).toEqual({
            ...initialState,
            warplaner: data
        })
    })
    it("should handle resetWarPlaner", () => {
        const data = {
            attackers: { ids: ['1', '42'], countires: [{ foo: 'bar' }, { abc: '123' }] },
            defenders: { ids: ['69'], countries: [{bla: 'bla'}]}
        }
        const state = Object.assign({}, {...initialState}, {warplaner: data})
        expect(reducer(state, resetWarPlaner())).toEqual({
            ...initialState
        })
    })
})