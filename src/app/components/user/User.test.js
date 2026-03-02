import React from "react"
import { cleanup, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../test-utils"
import User from "./User"
import { getExpectedDamage } from "../../utils/fooStuff"

jest.mock('./UserRankings', () => () => <mock-userrankings data-testid="mockUserRankings" />)
jest.mock('./UserSkills', () => () => <mock-userskills data-testid="mockUserSkills" />)
jest.mock('./UserInventory', () => () => <mock-userinventory data-testid="mockUserInventory" />)
jest.mock('./UserCardHeader', () => () => <mock-usercardheader data-testid="mockUserCardHeader" />)
jest.mock('./UserDates', () => () => <mock-userdates data-testid="mockUserDates" />)
jest.mock('../../utils/fooStuff', () => ({
    __esModule: true,
    ...jest.requireActual('../../utils/fooStuff'),
    getExpectedDamage: jest.fn((skills, useEquipment) => 0)
}))

describe("User", () => {
    afterEach(() => {
        cleanup()
    })
    it("can render", () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <User />, { container: document.body.appendChild(div) }
        )
        expect(getExpectedDamage).toHaveBeenCalled()
        expect(container).toBeInTheDocument()
    })
})