import React from "react"
import { cleanup, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../test-utils"
import { server } from "../../../mocks/server"
import { getUserByIdHandlers } from "../../../mocks/handlers"
import SearchResultUser from "./SearchResultUser"

jest.mock('../user/User', () => () => <mock-user data-testid="mockUser" />)

describe("SearchResultUser", () => {
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
        server.use(getUserByIdHandlers.defaultHandler)
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <SearchResultUser />, { container: document.body.appendChild(div) }
        )
        expect(container).toBeInTheDocument()
    })
    it("response error btn has resultId text", async () => {
        server.use(getUserByIdHandlers.errorHandler)
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <SearchResultUser resultId="123" />, { container: document.body.appendChild(div) }
        )
        await screen.findByRole('button', { name: /123/i })
    })
    it("response data btn has data.name text, click and close modal", async () => {
        server.use(getUserByIdHandlers.defaultHandler)
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <SearchResultUser resultId="123" />, { container: document.body.appendChild(div) }
        )
        const btn = await screen.findByRole('button', { name: /foo/i })
        await userEvent.click(btn)
        await screen.findByTestId("mockUser")
        const closeBtn = await screen.findByRole('button', { name: /Close/i })
        const modalEl = await screen.findByRole('dialog')
        await userEvent.click(closeBtn)
        expect(modalEl).not.toBeInTheDocument()
        
    })
})