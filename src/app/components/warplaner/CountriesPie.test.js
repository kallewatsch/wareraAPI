import React from "react"
import { cleanup, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../test-utils"
import CountriesPie from "./CountriesPie"

describe("WarPlaner", () => {
    afterEach(() => {
        cleanup()
    })
    it("can render", () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <CountriesPie />, { container: document.body.appendChild(div) }
        )
        expect(container).toBeInTheDocument()
    })
})