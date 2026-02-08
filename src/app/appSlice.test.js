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
    /* it("should return initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })
    it("should handle setLoggedIn", () => {
        expect(reducer(initialState, setLoggedIn(true))).toEqual({
            ...initialState,
            loggedIn: true
        })
    })
    it("should handle setAccessToken", () => {
        const token = 'foo'
        expect(reducer(initialState, setAccessToken(token))).toEqual({
            ...initialState,
            accessToken: token
        })
    }) */
})