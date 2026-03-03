import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import Badge from "react-bootstrap/Badge"
import CountrySelectModal from "../util/CountrySelectModal"
import { useLazyGetUsersByCountryQuery, useLazyGetAnythingBatchedPostQuery } from "../../api"
import { setIsLoading, setUsers } from "../../appSlice"
import SortableTable from "../util/SortableTable"
import { getCanAttackTimes, getExpectedAttackCost, getExpectedDamage, getHoursUntilLastOnline } from "../../utils/fooStuff"
import "./Intel.css"


export const Intel = (props) => {

    const { countries, users } = useSelector(state => state.app)
    const [showModal, setShowModal] = useState(false)
    const [country, setCountry] = useState('')
    const [thMode, setThMode] = useState('war')

    const [getUserIds] = useLazyGetUsersByCountryQuery()
    const [getAnythingBatched] = useLazyGetAnythingBatchedPostQuery()

    const dispatch = useDispatch()

    const handleSetThMode = event => {
        const modes = ["war", "eco", "realtime"]
        const index = modes.indexOf(thMode)
        const foo = (index + 1) % modes.length
        const _thMode = index == -1 ? modes[0] : modes[foo]
        setThMode(_thMode)
    }

    const handleSetCountry = async country => {
        const startedAt = Date.now()
        setShowModal(false)
        dispatch(setIsLoading(true))
        try {
            let { result: { data: { items, nextCursor }, error } } = await getUserIds({ countryId: country, limit: 100 }).unwrap()
            let allItems = [...items]
            while (nextCursor) {
                let { result: { data: moreData }, error } = await getUserIds({ countryId: country, cursor: nextCursor, limit: 100 }).unwrap()
                allItems = [...allItems, ...moreData.items]
                nextCursor = moreData.nextCursor
            }

            let allUsers = []
            const ep = 'user.getUserLite'
            while (allItems.length) {
                const chunk = allItems.splice(0, 800)

                const payloadPost = {
                    endpoints: chunk.map(item => ep),
                    obj: Object.fromEntries(chunk.map((val, i) => [i, { userId: val._id }]))
                }
                const someUsers = await getAnythingBatched(payloadPost).unwrap()
                allUsers = [...allUsers, ...someUsers]
            }

            dispatch(setUsers(allUsers))

        } catch (err) {
            console.log(err)
            dispatch(setIsLoading(false))
        } finally {
            setCountry(countries.find(cunt => cunt._id == country))
            dispatch(setIsLoading(false))
            const finishedAt = Date.now()
            console.log(`finished after ${(finishedAt - startedAt) / 1000} seconds`)
        }

    }

    const modalProps = {
        show: showModal, handleClose: setShowModal, confirm: handleSetCountry, countries: [...countries],
        title: 'bla'
    }

    const thsSkillsWar = [
        { txt: 'expected dmg', attrPath: ["extended"], target: "expDmg" },
        { txt: 'expected attack health cost', attrPath: ["extended"], target: "expAttCost" },
        { txt: 'Can Attack Times', attrPath: ["extended"], target: "canAttackTimes" },
        { txt: 'available Dmg', attrPath: ["extended"], target: "availableDmg" },
        { txt: 'attack total', attrPath: ['skills', 'attack'], target: 'total' },
        { txt: 'health', attrPath: ['skills', 'health'], target: 'total' },
        { txt: 'h now', attrPath: ['skills', 'health'], target: 'currentBarValue' },
        { txt: 'hunger', attrPath: ['skills', 'hunger'], target: 'total' },
        { txt: 'hu now', attrPath: ['skills', 'hunger'], target: 'currentBarValue' },
        { txt: 'crit chance', attrPath: ['skills', 'criticalChance'], target: 'total' },
        { txt: 'crit dmg', attrPath: ['skills', 'criticalDamages'], target: 'total' },
        { txt: 'armor', attrPath: ['skills', 'armor'], target: 'total' },
        { txt: 'precision', attrPath: ['skills', 'precision'], target: 'total' },
        { txt: 'dodge', attrPath: ['skills', 'dodge'], target: 'total' },
        { txt: 'lootChance', attrPath: ['skills', 'lootChance'], target: 'total' },
    ]

    const thsRealTime = [
        { txt: 'energy', attrPath: ['skills', 'energy'], target: 'currentBarValue' },
        { txt: 'health', attrPath: ['skills', 'health'], target: 'currentBarValue' },
        { txt: 'hunger', attrPath: ['skills', 'hunger'], target: 'currentBarValue' },
        { txt: 'en now', attrPath: ['skills', 'entrepreneurship'], target: 'currentBarValue' },
        { txt: 'last online hours', attrPath: ["extended"], target: 'hoursUntilLastOnline' }
    ]

    const thSkillsEco = [
        { txt: 'energy', attrPath: ['skills', 'energy'], target: 'total' },
        { txt: 'e now', attrPath: ['skills', 'energy'], target: 'currentBarValue' },
        { txt: 'entrepreneurship', attrPath: ['skills', 'entrepreneurship'], target: 'total' },
        { txt: 'en now', attrPath: ['skills', 'entrepreneurship'], target: 'currentBarValue' },
        { txt: 'production', attrPath: ['skills', 'production'], target: 'total' },
        { txt: 'companies', attrPath: ['skills', 'companies'], target: 'total' },
        { txt: 'management', attrPath: ['skills', 'management'], target: 'total' }
    ]

    const availableThs = {
        eco: thSkillsEco,
        war: thsSkillsWar,
        realtime: thsRealTime
    }

    const thsSkills = availableThs[thMode] || []

    const ths = [
        { txt: 'username', attrPath: "", target: "username" },
        ...thsSkills
    ]

    // TODO: add function to calculate expected values for amount of attacks a user can do (based on hp, armor & dodge). lootChance aswell
    const extendedUsers = [...users].map((user =>
        Object.assign(
            {},
            { ...user },
            {
                extended: {
                    expDmg: getExpectedDamage({ ...user?.skills }),
                    expAttCost: getExpectedAttackCost({ ...user?.skills }, false),
                    canAttackTimes: getCanAttackTimes({ ...user?.skills }),
                    availableDmg: getExpectedDamage({ ...user?.skills }) * getCanAttackTimes({ ...user?.skills }),
                    hoursUntilLastOnline: getHoursUntilLastOnline(user?.dates?.lastConnectionAt)
                }
            }
        )
    ))

    const totalAvailableCountryDmg = Math.round(extendedUsers.reduce((acc, curr) => acc + curr.extended.availableDmg, 0)).toLocaleString()

    return (
        <>
            <Row>
                <Button onClick={() => setShowModal(true)}>change Country</Button>
            </Row>
            <hr />
            {
                country && <Row>
                    <Button onClick={handleSetThMode}>toggle mode</Button>
                    <h5>{country?.name} | current mode: <Badge bg={thMode} txt={thMode}>{thMode}</Badge></h5>
                    <h4 style={{border: "solid red"}}>Total available Dmg: {totalAvailableCountryDmg}</h4>
                    <SortableTable items={[...extendedUsers]} ths={[...ths]} component="user" key={`${country?._id}-${thMode}`} />
                </Row>
            }
            <CountrySelectModal {...modalProps} />
        </>
    )

}


export default Intel