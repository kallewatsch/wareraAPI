import React, { useState } from "react"
import { useSelector } from "react-redux"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import { BsBoxArrowInRight } from "react-icons/bs";
import CountrySelectModal from "./util/CountrySelectModal"
import { getMUsByCountry, hasFreeSlots } from "../utils/arrayStuff"
import Mu from "./mu/Mu"


export const FreeMUs = () => {

    const { countries, mus, users } = useSelector(state => state.app)
    const [country, setCountry] = useState()
    const [activeKey, setActiveKey] = useState()
    const [showModal, setShowModal] = useState(false)

    //const countryUsers = worldusers?.[country?._id] || []
    const countryUsers = users.filter(user => user.country == country?._id)
    const cuntMus = getMUsByCountry(mus, countryUsers)
    const countryMus = cuntMus.sort((a, b) => hasFreeSlots(a) > hasFreeSlots(b) ? -1 : hasFreeSlots(a) < hasFreeSlots(b) ? 1 : 0)

    const handleSetCountry = async countryId => {
        setShowModal(false)
        setCountry(countries.find(cunt => cunt._id == countryId))
    }

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

    const handleCopyToClipboard = event => {
        const cuntMus = getMUsByCountry(mus, countryUsers)
        const freeMuLinks = cuntMus.filter(mu => hasFreeSlots(mu)).map(mu => `https://app.warera.io/mu/${mu._id}`).join('\n')
        console.log({freeMuLinks})
        navigator.clipboard.writeText(freeMuLinks)
    }

    const modalProps = {
        show: showModal, handleClose: setShowModal, confirm: handleSetCountry, countries: [...countries],
        title: 'bla'
    }

    return (
        <>
            <Button onClick={() => setShowModal(true)}>change Country</Button>
            {cuntMus && country && <h3>There are {cuntMus.length} MUs for country {country.name}</h3>}
            <Button disabled={!country} onClick={handleCopyToClipboard}>Copy Free Military Unit Links</Button>

            <Accordion activeKey={activeKey} onSelect={handleSetActiveKeyAndScroll}>
                {countryMus && countryMus.map((mu, i) => {
                    const eventKey = mu._id
                    const filledSlots = mu.members.length
                    const maxSlots = (mu.activeUpgradeLevels.dormitories * 5)
                    const empySlots = maxSlots - filledSlots
                    return (
                        <Accordion.Item eventKey={eventKey} id={eventKey} key={i}>
                            <Accordion.Header>{mu.name} {filledSlots}/{maxSlots} {empySlots > 1 && <span className="freeSlotsMadness">!!!FREE SLOTS!!!</span>}</Accordion.Header>
                            <Accordion.Body>
                                <Button target="_blank" href={`https://app.warera.io/mu/${mu._id}`}>Visit Military Unit<BsBoxArrowInRight /></Button>
                                <Mu {...mu} />
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
            <CountrySelectModal {...modalProps} />
        </>
    )
}

export default FreeMUs