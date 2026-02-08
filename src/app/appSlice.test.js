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
    setCompanies
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
            companies: []
        })
    })
    it("should return initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })
    it("should handle setData", () => {
        let foo = {bar: 'baz'}
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
        const data = [{foo: 'bar'}, {abc: '123'}]
        expect(reducer(initialState, setCountries(data))).toEqual({
            ...initialState,
            countries: data
        })
    })
})