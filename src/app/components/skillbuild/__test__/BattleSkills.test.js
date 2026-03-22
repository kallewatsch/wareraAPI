import React from "react"
import { renderWithProviders } from "../../../../test-utils"
import BattleSkills from "../BattleSkills"


jest.mock('../Skill', () => () => <mock-skill />)

describe("BattleSkills", () => {
    it("can render", () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <BattleSkills />, { container: document.body.appendChild(div) }
        )
        expect(container).toBeInTheDocument()
    })
})