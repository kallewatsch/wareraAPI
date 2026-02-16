import React from "react"
import App from "./App"
import { server } from "../mocks/server"
import { handlers } from "../mocks/handlers"
import { renderWithProviders } from "../test-utils"

describe("App", () => {
    beforeAll(() => {
        server.listen()
    })
    afterEach(() => {
        server.resetHandlers()
    })
    afterAll(() => {
        server.close()
    })
    it("can render", () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <App />, { container: document.body.appendChild(div) }
        )
        expect(container).toBeInTheDocument()
    })
})