import React from "react"
import { cleanup } from "@testing-library/react"
import { renderWithProviders } from "../../../test-utils"
import Ranking from "./Ranking"

describe("Ranking", () => {
    afterEach(() => {
        cleanup()
    })
    it("can render", () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <Ranking />, { container: document.body.appendChild(div) }
        )
        expect(container).toBeInTheDocument()
    })
})