import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Accordion from "react-bootstrap/Accordion"
import { useLazyGetCountryByIdQuery, useGetAllCountriesQuery } from "../api"
import SimpleStats from "./SimpleStats"
import Country from "./country/Country"

export const Countries = () => {

    const [getCountryById] = useLazyGetCountryByIdQuery()
    const { countries } = useSelector(state => state.app)
    const [countryId, setCountryId] = useState('')
    const [activeKey, setActiveKey] = useState('')
    const [filterName, setFilterName] = useState('')
    const dispatch = useDispatch()

    const handleSetActiveKeyAndScroll = key => {
        if (key == activeKey || !key) {
            setActiveKey("")
        } else {
            setActiveKey(key)
            setTimeout(() => {
                const el = document.getElementById(key)
                el.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                })
            }, 500)
        }
    }

    const handleChange = event => {
        setCountryId(event.target.value)
    }

    const handleChangeFilterName = event => {
        // TODO: maybe debounce this
        setFilterName(event.target.value)
    }

    const country = countries && countries.find(country => country._id == countryId)
    const filteredCountries = countries && countries.filter(country => country.name.includes(filterName))

    return <>
        <Form.Control onChange={handleChangeFilterName} placeholder="Enter Country Name"/>
        <Accordion activeKey={activeKey} onSelect={handleSetActiveKeyAndScroll}>
            {filteredCountries.map((country, i) => {
                const eventKey = country.name.replace(/\s/g, "")
                return (
                    <Accordion.Item eventKey={eventKey} id={eventKey} key={i}>
                        <Accordion.Header>{country.name}</Accordion.Header>
                        <Accordion.Body>
                            <Country key={i} {...country} />
                        </Accordion.Body>
                    </Accordion.Item>
                )
            })}
        </Accordion>
        {/* <InputGroup>
            <Form.Select onChange={handleChange} value={countryId}>
                <option value="">Select Country</option>
                {countries && countries.map((item, i) => <option value={item._id} key={`countryCode-${i}`}>{item.name}</option>)}
            </Form.Select>
        </InputGroup>
        {country && <>
            <Country {...country} /></>} */}
    </>
}

export default Countries