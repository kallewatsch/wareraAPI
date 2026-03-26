import React, { useState } from "react"
import { setShowModal } from "../slices/apikeySlice"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs"
import RequestCounter from "./RequestCounter"
import { GiKey } from "react-icons/gi"
import { useDispatch } from "react-redux"


const routes = [
    "worldusers",
    "skillbuild",
    "freemus",
    "search",
    "countries",
    /* "companies", */
    "regions",
    "warplaner",
    /* "market", */
    "intel",
    "events",
    "cases",
    "miau"
]


export const Navigation = () => {

    const [theme, setTheme] = useState('')

    const dispatch = useDispatch()

    const handleToggle = event => {
        const newTheme = document.documentElement.getAttribute('data-bs-theme') == 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('data-bs-theme', newTheme)
        setTheme(newTheme)
    }

    const handleToggleModal = event => {
        dispatch(setShowModal(true))
    }

    return (
        <Navbar id="navbar">
            <Navbar.Text><RequestCounter /></Navbar.Text>
            <Nav as="ul" variant="tabs">
                {routes.map((route, i) => <Nav.Item as="li" key={`route-${i}`}><Nav.Link href={`#${route}`}>{route}</Nav.Link></Nav.Item>)}
                <Nav.Item as="li"><Button variant="secondary" onClick={handleToggleModal}><GiKey /></Button></Nav.Item>
                <Nav.Item as="li"><Button variant="secondary" onClick={handleToggle}>{theme == 'light' ? <BsFillSunFill /> : <BsFillMoonStarsFill />}</Button></Nav.Item>
                
            </Nav>
        </Navbar>
    )
}

export default Navigation