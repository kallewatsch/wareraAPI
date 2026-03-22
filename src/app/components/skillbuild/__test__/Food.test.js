import React from "react"
import { cleanup, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../../test-utils"
import Food from "../Food"
import { initialState } from "../../../slices/skillbuildSlice"

describe("Food", () => {
    it("can render", () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <Food />,
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
            <Food />,
            {
                preloadedState: { app: { skillbuild: initialState } },
                container: document.body.appendChild(div)
            }
        )
        const noFoodBtn = await screen.findByRole("button", { name: "noFood" })
        const breadFoodBtn = await screen.findByRole("button", { name: "breadFood" })
        const steakFoodBtn = await screen.findByRole("button", { name: "steakFood" })
        const fishFoodBtn = await screen.findByRole("button", { name: "fishFood" })
        await userEvent.click(breadFoodBtn)
        await userEvent.click(fishFoodBtn)
        await userEvent.click(steakFoodBtn)
        await userEvent.click(noFoodBtn)
    })
})