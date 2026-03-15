import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Row from "react-bootstrap/Row"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import Button from "react-bootstrap/Button"
import CountrySelectModal from "../util/CountrySelectModal"
import SortableTableWithTabs from "../util/table/SortableTableWithTabs"
import { extendUser } from "../../utils/userStuff"
import Country from "../country/Country"
import "./Intel.css"
import { intelTabs, thsBaz, thsFoo } from "./intelTableheaders"
import { addUsers } from "../../slices/usersSlice"


export const Intel = (props) => {

    const { countries, users, userIds, loading } = useSelector(state => state.app)
    const [showModal, setShowModal] = useState(false)
    const [country, setCountry] = useState('')
    const [key, setKey] = useState('users')

    const dispatch = useDispatch()

    useEffect(() => {
        if (loading.isLoading) return;
        const countryUserIds = userIds.filter(x => x.countryId == country?._id).map(x => x.userId)
        const exisintUserIds = users.map(user => user._id)
        const missingUserIds = countryUserIds.filter(id => !exisintUserIds.includes(id))
        console.log({ missingUserIds })
        if (missingUserIds.length) {
            dispatch(addUsers({ userIds: missingUserIds, chunksize: 800 }))
        }
    }, [country])

    const handleSetCountry = async countryId => {
        setShowModal(false)
        setCountry(countries.find(cunt => cunt._id == countryId))
    }

    const modalProps = {
        show: showModal, handleClose: setShowModal, confirm: handleSetCountry, countries: [...countries],
        title: 'Select Country'
    }

    const tabs = intelTabs

    // TODO: add function to calculate expected values for amount of attacks a user can do (based on hp, armor & dodge). lootChance aswell
    //const extendedUsers = [...worldusers["6813b6d446e731854c7ac79c"]].map((user =>
    const extendedUsers = users?.filter(user => user.country == country?._id).map(user => extendUser(user))

    /* const extendedUsersWithBan = extendedUsers.filter(user => user.infos?.isBanned)
    const extendedUsersWithoutBan = extendedUsers.filter(user => !user.infos?.isBanned)

    const totalAvailableCountryDmg = Math.round(extendedUsersWithoutBan.reduce((acc, curr) => acc + curr.extended.availableDmg, 0)).toLocaleString()
    const totalAvailableCountryDmgBan = Math.round(extendedUsersWithBan.reduce((acc, curr) => acc + curr.extended.availableDmg, 0)).toLocaleString()
    const totalAvailableCountryDmgTotal = Math.round(extendedUsers.reduce((acc, curr) => acc + curr.extended.availableDmg, 0)).toLocaleString() */
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
                            {extendedUsers.length
                                ? <SortableTableWithTabs tabs={tabs} items={[...extendedUsers]} component="user" key={country?._id} />
                                : 'LOADING USERS'
                            }
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