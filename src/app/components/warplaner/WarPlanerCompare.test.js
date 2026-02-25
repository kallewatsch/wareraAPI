import React from "react"
import { cleanup, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../test-utils"
import WarPlanerCompare from "./WarPlanerCompare"
import { setWarPlaner, resetWarPlaner } from "../../appSlice"

jest.mock('./CountriesTable', () => () => <mock-countriestable />)
jest.mock('./CountriesPie', () => () => <mock-countriespie />)
jest.mock('./WarPlanerBars', () => () => <mock-warplanerbars />)
jest.mock('../../appSlice', () => ({
    __esModule: true,
    ...jest.requireActual('../../appSlice'),
    setWarPlaner: jest.fn((p) => ({ payload: p, type: 'app/setWarPlaner' })),
    resetWarPlaner: jest.fn(() => ({ type: 'app/resetWarPlaner' }))
}))

describe("WarPlanerCompare", () => {
    afterEach(() => {
        cleanup()
    })
    it("can render", () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <WarPlanerCompare />, { container: document.body.appendChild(div) }
        )
        expect(container).toBeInTheDocument()
    })
    it("click ally button twice", async () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <WarPlanerCompare />, {
            preloadedState: {
                app: {
                    warplaner: {
                        attackers: {
                            ids: [],
                            countries: [
                                { _id: '1', name: 'foo' }
                            ],
                            allies: [{ _id: 'miau' }],
                            excluded: []
                        },
                        defenders: {
                            ids: [],
                            countries: [
                                { _id: '42', name: 'bar' }
                            ],
                            allies: [{ _id: 'bla' }],
                            excluded: []
                        }
                    }
                }
            }, container: document.body.appendChild(div)
        }
        )
        const expectedBefore = {
            "attackers": {
                "allies": [{ "_id": "miau" }], "countries": [{ "_id": "1", "name": "foo" }], "excluded": ["miau"], "ids": []
            },
            "defenders": {
                "allies": [{ "_id": "bla" }], "countries": [{ "_id": "42", "name": "bar" }], "excluded": ["bla"], "ids": []
            }
        }
        const btnBefore = await screen.findByRole('button', { name: /exclude allies/i })
        await userEvent.click(btnBefore)
        expect(setWarPlaner).toHaveBeenCalledWith(expectedBefore)
        setWarPlaner.mockClear()
        const expectedAfter = {
            "attackers": {
                "allies": [{ "_id": "miau" }], "countries": [{ "_id": "1", "name": "foo" }], "excluded": [], "ids": []
            },
            "defenders": {
                "allies": [{ "_id": "bla" }], "countries": [{ "_id": "42", "name": "bar" }], "excluded": [], "ids": []
            }
        }
        const btnAfter = await screen.findByRole('button', { name: /include allies/i })
        await userEvent.click(btnAfter)
        expect(setWarPlaner).toHaveBeenLastCalledWith(expectedAfter)
    })
    it("click reset button", async () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <WarPlanerCompare />, { container: document.body.appendChild(div) }
        )
        const resetBtn = await screen.findByRole('button', { name: /Reset/i })
        await userEvent.click(resetBtn)
        expect(resetWarPlaner).toHaveBeenCalled()
    })
})