import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import CountrySelectModal from "../util/CountrySelectModal"
import { useLazyGetUsersByCountryQuery, useLazyGetAnythingBatchedPostQuery } from "../../api"
import { setIsLoading, setUsers } from "../../appSlice"
import SortableTable from "../util/SortableTable"

export const Intel = (props) => {

    const { countries, users } = useSelector(state => state.app)
    const [showModal, setShowModal] = useState(true)
    const [country, setCountry] = useState('')

    const [getUserIds] = useLazyGetUsersByCountryQuery()
    const [getAnythingBatched] = useLazyGetAnythingBatchedPostQuery()

    const dispatch = useDispatch()

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

    const thsSkills = [
        { txt: 'attack total', key: 'attack', target: 'total' },
        { txt: 'energy', key: 'energy', target: 'total' },
        { txt: 'now', key: 'energy', target: 'currentBarValue' },
        { txt: 'health', key: 'health', target: 'total' },
        { txt: 'now', key: 'health', target: 'currentBarValue' },
        { txt: 'hunger', key: 'hunger', target: 'total' },
        { txt: 'now', key: 'hunger', target: 'currentBarValue' },
        { txt: 'entrepreneurship', key: 'entrepreneurship', target: 'total' },
        { txt: 'now', key: 'entrepreneurship', target: 'currentBarValue' },
        { txt: 'production', key: 'production', target: 'total' },
        { txt: 'companies', key: 'companies', target: 'total' },
        { txt: 'crit chance', key: 'criticalChance', target: 'total' },
        { txt: 'crit dmg', key: 'criticalDamages', target: 'total' },
        { txt: 'armor', key: 'armor', target: 'total' },
        { txt: 'precision', key: 'precision', target: 'total' },
        { txt: 'dodge', key: 'dodge', target: 'total' },
        { txt: 'lootChance', key: 'lootChance', target: 'total' },
        { txt: 'management', key: 'management', target: 'total' }].map(x => ({
            txt: x.txt, attrPath: ["skills", x.key], target: x.target
        }))

    const ths = [
        { txt: 'username', attrPath: "", target: "username" },
        ...thsSkills
    ]

    return (
        <Row>
            <Button onClick={() => setShowModal(true)}>change Country</Button>
            <h5>{country?.name}</h5>
            <SortableTable items={[...users]} ths={ths} component="user" key={`${country?._id}`} />
            <CountrySelectModal {...modalProps} />
        </Row>
    )

}


export default Intel