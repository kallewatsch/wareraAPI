import React, { useState } from "react"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";


const routes = [
    "freemus",
    "search",
    "countries",
    "regions",
    "warplaner",
    /* "market", */
    "intel",
    "miau"
]

const disabledRoutes = [
]

export const Navigation = () => {

    const [theme, setTheme] = useState('')

    const handleToggle = event => {
        const newTheme = document.documentElement.getAttribute('data-bs-theme') == 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('data-bs-theme', newTheme)
        setTheme(newTheme)
    }

    return (
        <Nav>
            <Nav.Item><Nav.Link href="/">home - not working</Nav.Link></Nav.Item>
            {routes.map((route, i) => <Nav.Item key={`route-${i}`}><Nav.Link href={`#${route}`}>{route}</Nav.Link></Nav.Item>)}
            {disabledRoutes.map((route, i) => <Nav.Item key={`disabledroute-${i}`}><Nav.Link href={`#${route}`} disabled>{route}</Nav.Link></Nav.Item>)}
            <Nav.Item><Button variant="secondary" onClick={handleToggle}>{theme == 'light' ? <BsFillSunFill /> : <BsFillMoonStarsFill />}</Button></Nav.Item>
        </Nav>
    )
}

export default Navigation