import React from "react"
import { cleanup, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../test-utils"
import CountrySelectModal from "./CountrySelectModal"


describe("CountrySelectModal", () => {
    afterEach(() => {
        cleanup()
    })
    it("can render", () => {
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <CountrySelectModal />, { container: document.body.appendChild(div) }
        )
        expect(container).toBeInTheDocument()
    })
    it("select country click Ok", async () => {
        const confirmMock = jest.fn()
        const props = {
            confirm: confirmMock,
            show: true,
            countries: [{ _id: "1", name: "foo" }, { _id: "42", name: "bar" }]
        }
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <CountrySelectModal {...props} />, { container: document.body.appendChild(div) }
        )
        const selectEl = await screen.findByRole('combobox')
        await userEvent.selectOptions(selectEl, "42")
        const btnEl = await screen.findByRole('button', { name: /Ok/i })
        await userEvent.click(btnEl)
        expect(confirmMock).toHaveBeenCalledWith("42")
    })
    it("click Abort", async () => {
        const handleCloseMock = jest.fn()
        const props = {
            handleClose: handleCloseMock,
            show: true,
            countries: [{ _id: "1", name: "foo" }, { _id: "42", name: "bar" }]
        }
        const div = document.createElement('div')
        const { container } = renderWithProviders(
            <CountrySelectModal {...props} />, { container: document.body.appendChild(div) }
        )
        const btnEl = await screen.findByRole('button', { name: /Abort/i })
        await userEvent.click(btnEl)
        expect(handleCloseMock).toHaveBeenCalled
    })
})