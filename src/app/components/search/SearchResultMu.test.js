import React from "react"
import { cleanup, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../test-utils"
import { server } from "../../../mocks/server"
import { getMuByIdHandlers } from "../../../mocks/handlers"
import SearchResultMu from "./SearchResultMu"

jest.mock('../mu/Mu', () => () => <mock-mu data-testid="mockMu" />)

describe("SearchResultMu", () => {
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
        server.use(getMuByIdHandlers.defaultHandler)
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <SearchResultMu />, { container: document.body.appendChild(div) }
        )
        expect(container).toBeInTheDocument()
    })
    it("response error btn has resultId text", async () => {
        server.use(getMuByIdHandlers.errorHandler)
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <SearchResultMu resultId="123" />, { container: document.body.appendChild(div) }
        )
        await screen.findByRole('button', { name: /123/i })
    })
    it("response data btn has data.name text, click and close modal", async () => {
        server.use(getMuByIdHandlers.defaultHandler)
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <SearchResultMu resultId="123" />, { container: document.body.appendChild(div) }
        )
        const btn = await screen.findByRole('button', { name: /foo/i })
        await userEvent.click(btn)
        await screen.findByTestId("mockMu")
        const closeBtn = await screen.findByRole('button', { name: /Close/i })
        const modalEl = await screen.findByRole('dialog')
        await userEvent.click(closeBtn)
        expect(modalEl).not.toBeInTheDocument()
        
    })
})