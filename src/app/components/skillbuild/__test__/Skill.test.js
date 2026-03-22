import React from "react"
import { cleanup, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../../test-utils"
import Skill from "../Skill"
import { initialState } from "../../../slices/skillbuildSlice"

describe("Skill", () => {
    it("can render", () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <Skill />,
            {
                preloadedState: { app: { skillbuild: initialState } },
                container: document.body.appendChild(div)
            }
        )
        expect(container).toBeInTheDocument()
    })
    it("clicking buttons", async () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <Skill />,
            {
                preloadedState: { app: { skillbuild: initialState } },
                container: document.body.appendChild(div)
            }
        )
        const minimumBtn = await screen.findByRole("button", { name: "minimum" })
        const minusBtn = await screen.findByRole("button", { name: "minus" })
        const plusBtn = await screen.findByRole("button", { name: "plus" })
        const maximumBtn = await screen.findByRole("button", { name: "maximum" })
        await userEvent.click(minusBtn)
        await userEvent.click(maximumBtn)
        await userEvent.click(plusBtn)
        await userEvent.click(minusBtn)
        await userEvent.click(minimumBtn)
        await userEvent.click(plusBtn)
    })
})