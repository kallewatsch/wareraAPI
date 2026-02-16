import React from "react"
import { cleanup, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../test-utils"
import WarPlaner from "./WarPlaner"

jest.mock('./WarPlanerCompare', () => () => <mock-warplanercompare />);

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
    it("Add Attacker Button click, select confirm and remove it", async () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <WarPlaner />, {
            preloadedState: {
                app: {
                    countries: [
                        { _id: '1', name: 'foo' },
                        { _id: '42', name: 'bar' }
                    ],
                    warplaner: {
                        attackers: {
                            ids: []
                        },
                        defenders: {
                            ids: []
                        }
                    }
                }
            },
            container: document.body.appendChild(div)
        })
        const btn = await screen.findByRole('button', { name: /Add Attacker/i })
        await userEvent.click(btn)
        const selectEl = await screen.findByRole('combobox')
        await userEvent.selectOptions(selectEl, "42")
        const confirmBtn = await screen.findByRole('button', { name: /Ok/i })
        await userEvent.click(confirmBtn)
        await screen.findByText('bar')
        const removeBtn = await screen.findByRole('button', { name: /remove/i })
        await userEvent.click(removeBtn)
    })
    it("Add Defender Button click, select confirm and remove it", async () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <WarPlaner />, {
            preloadedState: {
                app: {
                    countries: [
                        { _id: '1', name: 'foo' },
                        { _id: '42', name: 'bar' }
                    ],
                    warplaner: {
                        attackers: {
                            ids: []
                        },
                        defenders: {
                            ids: []
                        }
                    }
                }
            },
            container: document.body.appendChild(div)
        })
        const btn = await screen.findByRole('button', { name: /Add Defender/i })
        await userEvent.click(btn)
        const selectEl = await screen.findByRole('combobox')
        await userEvent.selectOptions(selectEl, "42")
        const confirmBtn = await screen.findByRole('button', { name: /Ok/i })
        await userEvent.click(confirmBtn)
        await screen.findByText('bar')
        const removeBtn = await screen.findByRole('button', { name: /remove/i })
        await userEvent.click(removeBtn)
    })
    it("Add Attacker and Defenders, click compare button", async () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <WarPlaner />, {
            preloadedState: {
                app: {
                    countries: [
                        { _id: '1', name: 'foo' },
                        { _id: '42', name: 'bar' }
                    ],
                    warplaner: {
                        attackers: {
                            ids: []
                        },
                        defenders: {
                            ids: []
                        }
                    }
                }
            },
            container: document.body.appendChild(div)
        })
        const addAttackerBtn = await screen.findByRole('button', { name: /Add Attacker/i })
        await userEvent.click(addAttackerBtn)
        const selectAttackerEl = await screen.findByRole('combobox')
        await userEvent.selectOptions(selectAttackerEl, "42")
        const confirmAttackerBtn = await screen.findByRole('button', { name: /Ok/i })
        await userEvent.click(confirmAttackerBtn)

        const addDefenderBtn = await screen.findByRole('button', { name: /Add Defender/i })
        await userEvent.click(addDefenderBtn)
        const selectDefenderEl = await screen.findByRole('combobox')
        await userEvent.selectOptions(selectDefenderEl, "1")
        const confirmDefenderBtn = await screen.findByRole('button', { name: /Ok/i })
        await userEvent.click(confirmDefenderBtn)

        const compareBtn = await screen.findByRole('button', { name: /Compare/i })
        await userEvent.click(compareBtn)
    })
})