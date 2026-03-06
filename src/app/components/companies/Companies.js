import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLazyGetAnythingBatchedPostQuery } from "../../api"
import { setIsLoading, setCompanies, setToast } from "../../appSlice"
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import CountrySelectModal from "../util/CountrySelectModal"
import SimpleStats from "../SimpleStats"
import Company from "./Company"


// TODO: maybe load all companies at page load too (in App.js)
export const Companies = (props) => {

    const [showModal, setShowModal] = useState(true)
    const [country, setCountry] = useState()

    const { countries, companies, users } = useSelector(state => state.app)

    const [getAnythingBatched] = useLazyGetAnythingBatchedPostQuery()

    const dispatch = useDispatch()

    const handleSetCountry = async countryId => {
        console.log({countryId})
        const startedAt = Date.now()
        setShowModal(false)
        setCountry(countries.find(cunt => cunt._id == countryId))
        dispatch(setIsLoading(true))
        try {
            let allCompanyIds = []
            let allUserIds = users.filter(user => user.country == countryId).map(user => ({_id: user._id}))

            const epCompanies = 'company.getCompanies'
            while (allUserIds.length) {
                // TODO: the hardcoded splice part is meh. Implement logic do determine POST body size in advance
                //       and set it to max. 
                const chunk = allUserIds.splice(0, 600)

                const payloadPost = {
                    endpoints: chunk.map(item => epCompanies),
                    obj: Object.fromEntries(chunk.map((val, i) => [i, { userId: val._id, perPage: 100 }]))
                }

                const someCompanyIds = await getAnythingBatched(payloadPost).unwrap()
                allCompanyIds = [...allCompanyIds, ...someCompanyIds]
            }

            let companyIds = allCompanyIds.map(x => x.items).flat()
            let allCompanies = []
            const ep2 = 'company.getById'
            while (companyIds.length) {
                // TODO: the hardcoded splice part is meh. Implement logic do determine POST body size in advance
                //       and set it to max. Compare this with about. the 600 vs 800 is because of the extra perPage
                //       used above
                const chunk = companyIds.splice(0, 800)

                const payloadPost = {
                    endpoints: chunk.map(item => ep2),
                    obj: Object.fromEntries(chunk.map((val, i) => [i, { companyId: val }]))
                }
                const someCompanies = await getAnythingBatched(payloadPost).unwrap()
                allCompanies = [...allCompanies, ...someCompanies]
            }

            dispatch(setCompanies(allCompanies))

        } catch (err) {
            console.log(err)
            dispatch(setToast({ show: true, content: JSON.stringify(err, null, 2), bg: "danger" }))
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
            <b>TODO: interface to filter, search, etc. Scrollable container maybe</b>
            <h5>{country ? `${country.name} ${companies.length} Companies` : 'No Country selected'}</h5>
            <ListGroup>
                {companies && companies.map(((company, i) => <ListGroupItem key={i}><Company {...company} /></ListGroupItem>))}
            </ListGroup>
            <CountrySelectModal {...modalProps} />
        </>
    )

}


export default Companies