import React from "react"
import { cleanup, screen/* , waitFor */ } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../test-utils"
import WarPlaner from "./WarPlaner"


describe("WarPlaner", () => {
    afterEach(() => {
        cleanup()
    })
    it("can render", () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <WarPlaner />, { container: document.body.appendChild(div) }
        )
        expect(container).toBeInTheDocument()
    })
    it("Add Attacker Button click", async () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <WarPlaner />, { container: document.body.appendChild(div) }
        )
        const btn = await screen.findByRole('button', { name: /Add Attacker/i })
        await userEvent.click(btn)
    })
    it("Add Defemder Button click", async () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <WarPlaner />, { container: document.body.appendChild(div) }
        )
        const btn = await screen.findByRole('button', { name: /Add Defender/i })
        await userEvent.click(btn)
    })
})