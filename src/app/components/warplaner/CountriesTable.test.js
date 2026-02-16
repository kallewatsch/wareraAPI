import React from "react"
import { cleanup, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../test-utils"
import { initialStateWarplaner } from "../../../mocks/initialStateWarplaner"
import CountriesTable from "./CountriesTable"


describe("CountrySelectModal", () => {
    afterEach(() => {
        cleanup()
    })
    it("can render", () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <CountriesTable team="attackers" />, { container: document.body.appendChild(div) }
        )
        expect(container).toBeInTheDocument()
    })
    it("click tableheader twice", async () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <CountriesTable team="attackers" />, {
            preloadedState: {
                app: {
                    warplaner: initialStateWarplaner
                }
            },
            container: document.body.appendChild(div)
        })
        const thEl = await screen.findByRole('columnheader', { name: /Dmg$/i })
        await userEvent.click(thEl)
        await userEvent.click(thEl) // click again to reverse order
    })
    it("click nationflag twice", async () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <CountriesTable team="attackers" />, {
            preloadedState: {
                app: {
                    warplaner: initialStateWarplaner
                }
            },
            container: document.body.appendChild(div)
        })
        const imgEl = await screen.findByAltText('Angola')
        await userEvent.click(imgEl)
        await userEvent.click(imgEl)
    })
})