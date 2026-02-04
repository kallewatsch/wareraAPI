import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLazyGetMusPaginatedQuery, useLazyGetUserQuery, useLazyGetUsersByCountryQuery } from "../api"
import { setFreeMUs } from "../appSlice"

export const FreeGermanMUs = () => {

    const [getMUsPaginated] = useLazyGetMusPaginatedQuery()
    const dataState = useSelector(state => state.app)
    const dispatch = useDispatch()

    const handleGetFreeGermanMus = event => {
        // 6813b6e73e57e0601e792aa9
        // 6813b6d446e731854c7ac79c
        //let data = {orgId: "6813b6e73e57e0601e792aa9"}
        let data = {limit: 100}

        getMUsPaginated(data).then(result => {
            let freeMUs = result.data.result.data.items.filter(item => {
                let cond1 = item.members.length < item.activeUpgradeLevels.dormitories * 5
                return cond1
            }).map(item => ({url: `https://app.warera.io/mu/${item._id}`, name: item.name}))
            dispatch(setFreeMUs(freeMUs))
        })
    }

    const freeMUs = dataState.freeMUs.map((mu,i) => (<li key={i}><a href={mu.url} target="_blank">{mu.name}</a></li>))

    return <>
        <button onClick={handleGetFreeGermanMus}>getFreeGermanMus</button>
        <ul>
            {freeMUs}
        </ul>
    </>

}

export default FreeGermanMUs