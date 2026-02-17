import React from "react"
import { cleanup, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../test-utils"
import { server } from "../../../mocks/server"
import { getCountryByIdHandlers } from "../../../mocks/handlers"
import SearchResultCountry from "./SearchResultCountry"

jest.mock('../country/Country', () => () => <mock-country data-testid="mockCountry" />)

describe("SearchResultCountry", () => {
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
    it("it can render", () => {
        server.use(getCountryByIdHandlers.defaultHandler)
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <SearchResultCountry />, { container: document.body.appendChild(div) }
        )
        expect(container).toBeInTheDocument()
    })
    it("response error btn has resultId text", async () => {
        server.use(getCountryByIdHandlers.errorHandler)
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <SearchResultCountry resultId="123" />, { container: document.body.appendChild(div) }
        )
        await screen.findByRole('button', { name: /123/i })
    })
    it("response data btn has data.name text, click and close modal", async () => {
        server.use(getCountryByIdHandlers.defaultHandler)
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <SearchResultCountry resultId="123" />, { container: document.body.appendChild(div) }
        )
        const btn = await screen.findByRole('button', { name: /foo/i })
        await userEvent.click(btn)
        const countryMock = await screen.findByTestId("mockCountry")
        const closeBtn = await screen.findByRole('button', { name: /Close/i })
        const modalEl = await screen.findByRole('dialog')
        await userEvent.click(closeBtn)
        expect(modalEl).not.toBeInTheDocument()
        
    })
})