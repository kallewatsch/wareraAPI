import React, { useState } from "react"
import { useSelector } from "react-redux"
import Row from "react-bootstrap/Row"
import Tabs from "react-bootstrap/Tabs"
import Tab  from "react-bootstrap/Tab"
import Button from "react-bootstrap/Button"
import CountrySelectModal from "../util/CountrySelectModal"
import SortableTableWithTabs from "../util/SortableTableWithTabs"
import { extendUser } from "../../utils/userStuff"
import Country from "../country/Country"
import "./Intel.css"


export const Intel = (props) => {

    const { countries, users } = useSelector(state => state.app)
    const [showModal, setShowModal] = useState(false)
    const [country, setCountry] = useState('')
    const [key, setKey] = useState('users')

    const handleSetCountry = async countryId => {
        setShowModal(false)
        setCountry(countries.find(cunt => cunt._id == countryId))
    }

    const modalProps = {
        show: showModal, handleClose: setShowModal, confirm: handleSetCountry, countries: [...countries],
        title: 'Select Country'
    }

    const thsWar = [
        { txt: 'username', attrPath: [], target: "username" },
        { txt: 'attack total', attrPath: ['skills', 'attack'], target: 'total' },
        { txt: 'health', attrPath: ['skills', 'health'], target: 'total' },
        { txt: 'health now', attrPath: ['skills', 'health'], target: 'currentBarValue' },
        { txt: 'hunger', attrPath: ['skills', 'hunger'], target: 'total' },
        { txt: 'hunger now', attrPath: ['skills', 'hunger'], target: 'currentBarValue' },
        { txt: 'crit chance', attrPath: ['skills', 'criticalChance'], target: 'total' },
        { txt: 'crit dmg', attrPath: ['skills', 'criticalDamages'], target: 'total' },
        { txt: 'armor', attrPath: ['skills', 'armor'], target: 'total' },
        { txt: 'precision', attrPath: ['skills', 'precision'], target: 'total' },
        { txt: 'dodge', attrPath: ['skills', 'dodge'], target: 'total' },
        { txt: 'lootChance', attrPath: ['skills', 'lootChance'], target: 'total' },
    ]

    const thsEco = [
        { txt: 'username', attrPath: [], target: "username" },
        { txt: 'energy', attrPath: ['skills', 'energy'], target: 'total' },
        { txt: 'energy now', attrPath: ['skills', 'energy'], target: 'currentBarValue' },
        { txt: 'entrepreneurship', attrPath: ['skills', 'entrepreneurship'], target: 'total' },
        { txt: 'entrepreneurship', attrPath: ['skills', 'entrepreneurship'], target: 'currentBarValue' },
        { txt: 'production', attrPath: ['skills', 'production'], target: 'total' },
        { txt: 'companies', attrPath: ['skills', 'companies'], target: 'total' },
        { txt: 'management', attrPath: ['skills', 'management'], target: 'total' }
    ]

    const thsExtended = [
        { txt: 'username', attrPath: [], target: "username" },
        { txt: 'expected dmg', attrPath: ["extended"], target: "expDmg" },
        { txt: 'expected attack health cost', attrPath: ["extended"], target: "expAttCost" },
        { txt: 'Can Attack Times', attrPath: ["extended"], target: "canAttackTimes" },
        { txt: 'available Dmg', attrPath: ["extended"], target: "availableDmg" }
    ]

    const thsMisc = [
        { txt: 'username', attrPath: [], target: "username" },
        { txt: 'ban', attrPath: ['infos'], target: 'isBanned' },
        { txt: 'level', attrPath: ["leveling"], target: "level" },
        { txt: 'xp', attrPath: ["leveling"], target: "totalXp" },
    ]

    const tabs = [
        { name: 'Economy', ths: thsEco },
        { name: 'War', ths: thsWar },
        { name: 'Extended', ths: thsExtended },
        { name: 'Misc', ths: thsMisc }
    ]

    // TODO: add function to calculate expected values for amount of attacks a user can do (based on hp, armor & dodge). lootChance aswell
    //const extendedUsers = [...worldusers["6813b6d446e731854c7ac79c"]].map((user =>
    const extendedUsers = users?.filter(user => user.country == country?._id).map(user => extendUser(user))

    const extendedUsersWithBan = extendedUsers.filter(user => user.infos?.isBanned)
    const extendedUsersWithoutBan = extendedUsers.filter(user => !user.infos?.isBanned)

    const totalAvailableCountryDmg = Math.round(extendedUsersWithoutBan.reduce((acc, curr) => acc + curr.extended.availableDmg, 0)).toLocaleString()
    const totalAvailableCountryDmgBan = Math.round(extendedUsersWithBan.reduce((acc, curr) => acc + curr.extended.availableDmg, 0)).toLocaleString()
    const totalAvailableCountryDmgTotal = Math.round(extendedUsers.reduce((acc, curr) => acc + curr.extended.availableDmg, 0)).toLocaleString()
    return (
        <>
            <Row>
                <Button onClick={() => setShowModal(true)}>change Country</Button>
            </Row>
            <hr />
            {
                country && <Row>
                    <Tabs activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3">
                        <Tab eventKey="users" title="Users">
                            <SortableTableWithTabs tabs={tabs} items={[...extendedUsers]} component="user" key={country?._id} />
                        </Tab>
                        <Tab eventKey="country" title="Country">
                            <Country {...country} /> 
                        </Tab>
                    </Tabs>
                </Row>
            }
            <CountrySelectModal {...modalProps} />
        </>
    )

}


export default Intel