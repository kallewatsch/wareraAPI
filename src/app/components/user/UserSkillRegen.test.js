import React from "react"
import { cleanup, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../test-utils"
import UserSkillRegen from "./UserSkillRegen"

describe("User", () => {
    afterEach(() => {
        cleanup()
    })
    it("can render", () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <UserSkillRegen />, { container: document.body.appendChild(div) }
        )
        expect(container).toBeInTheDocument()
    })
})