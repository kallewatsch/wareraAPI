import React from "react"
import { cleanup, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../test-utils"
import { server } from "../../../mocks/server"
import { getRegionByIdHandlers } from "../../../mocks/handlers"
import SearchResultRegion from "./SearchResultRegion"

jest.mock('../region/Region', () => () => <mock-region data-testid="mockRegion" />)

describe("SearchResultRegion", () => {
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
        server.use(getRegionByIdHandlers.defaultHandler)
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <SearchResultRegion />, { container: document.body.appendChild(div) }
        )
        expect(container).toBeInTheDocument()
    })
    it("response error btn has resultId text", async () => {
        server.use(getRegionByIdHandlers.errorHandler)
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <SearchResultRegion resultId="123" />, { container: document.body.appendChild(div) }
        )
        await screen.findByRole('button', { name: /123/i })
    })
    it("response data btn has data.name text, click and close modal", async () => {
        server.use(getRegionByIdHandlers.defaultHandler)
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <SearchResultRegion resultId="123" />, { container: document.body.appendChild(div) }
        )
        const btn = await screen.findByRole('button', { name: /foo/i })
        await userEvent.click(btn)
        await screen.findByTestId("mockRegion")
        const closeBtn = await screen.findByRole('button', { name: /Close/i })
        const modalEl = await screen.findByRole('dialog')
        await userEvent.click(closeBtn)
        expect(modalEl).not.toBeInTheDocument()
        
    })
})