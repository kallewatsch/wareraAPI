import React from "react"
import { cleanup, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../test-utils"
import { server } from "../../../mocks/server"
import { searchAnythingHandlers } from "../../../mocks/handlers"
import { setIsLoading, setSearchResult } from "../../appSlice"
import Search from "./Search"


jest.mock("../../appSlice", () => ({
    __esModule: true,
    ...jest.requireActual('../../appSlice'),
    setIsLoading: jest.fn((payload) => ({ payload, type: 'app/setIsLoading' })),
    setSearchResult: jest.fn((payload) => ({ payload, type: 'app/setSearchResult' }))
}))

jest.mock('./SearchResult', () => () => <mock-searchresult />)

describe("Search", () => {
    beforeAll(() => {
        server.listen()
    })
    afterEach(() => {
        server.resetHandlers()
        cleanup()
    })
    afterAll(() => {
        server.close()
    })
    it("can render", () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <Search />, { container: document.body.appendChild(div) }
        )
        expect(container).toBeInTheDocument()
    })
    it("click search no data", async () => {
        server.use(searchAnythingHandlers.noDataHandler)
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <Search />, { container: document.body.appendChild(div) }
        )
        const searchBtn = await screen.findByRole('button', { name: /search/i })
        await userEvent.click(searchBtn)
    })
    it("click search has data", async () => {
        server.use(searchAnythingHandlers.hasDataHandler)
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <Search />, { container: document.body.appendChild(div) }
        )
        const searchBtn = await screen.findByRole('button', { name: /search/i })
        await userEvent.click(searchBtn)
    })
    it("click search error", async () => {
        server.use(searchAnythingHandlers.errorHandler)
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <Search />, { container: document.body.appendChild(div) }
        )
        const searchBtn = await screen.findByRole('button', { name: /search/i })
        await userEvent.click(searchBtn)
    })
    it("enter search term", async () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <Search />, { container: document.body.appendChild(div) }
        )
        const inputEl = await screen.findByRole('textbox')
        await userEvent.type(inputEl, "lala")
    })
})