import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Button from "react-bootstrap/Button"
import User from "../user/User"
import CountrySelectModal from "../util/CountrySelectModal"
import getUserLiteResponse from "../../../mocks/responses/user.getUserLite.json"
import { useLazyGetUsersByCountryQuery, useLazyGetUserQuery, useLazyGetAnythingBatchedQuery, useLazyGetAnythingBatchedPostQuery } from "../../api"
import { setIsLoading, setUsers } from "../../appSlice"

export const Intel = (props) => {

    const { countries, users } = useSelector(state => state.app)
    const [showModal, setShowModal] = useState(true)
    const [country, setCountry] = useState('')

    const [getUserIds] = useLazyGetUsersByCountryQuery()
    const [getUser] = useLazyGetUserQuery()
    const [getAnythingBatched] = useLazyGetAnythingBatchedPostQuery()

    const dispatch = useDispatch()

    const handleSetCountry = async country => {
        const startedAt = Date.now()
        setShowModal(false)
        setCountry(countries.find(cunt => cunt._id == country))
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
            dispatch(setIsLoading(false))
            const finishedAt = Date.now()
            console.log(`finished after ${(finishedAt - startedAt) / 1000} seconds`)
        }

    }

    const modalProps = {
        show: showModal, handleClose: setShowModal, confirm: handleSetCountry, countries: [...countries],
        title: 'bla'
    }

    return (
        <>
            <Button onClick={() => setShowModal(true)}>change Country</Button>
            <h5>{country ? `${country.name} ${users.filter(user => user.isActive == true).length} Users, newest first` : 'No Country selected'}</h5>
            {users && [...users].sort((a, b) => a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0).map((user, i) => {
                return <User key={i} {...user} />
            })}
            <CountrySelectModal {...modalProps} />
        </>
    )

}


export default Intel