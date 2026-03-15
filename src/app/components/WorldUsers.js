import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addUsers } from "../slices/usersSlice";
import SortableTableWithTabs from "./util/table/SortableTableWithTabs"
import { intelTabs } from "./intel/intelTableheaders";
import { extendUser } from "../utils/userStuff"
import { CHUNKSIZES } from "../config";

export const WorldUsers = (props) => {

    const { users, userIds, loading } = useSelector(state => state.app)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!userIds) return;
        const worldUserIds = userIds.map(x => x.userId)
        const exisintUserIds = users?.map(user => user._id) || []
        const missingUserIds = worldUserIds.filter(id => !exisintUserIds.includes(id))
        const chunksize = CHUNKSIZES.getUserLite
        if (missingUserIds.length) {
            dispatch(addUsers({ userIds: missingUserIds, chunksize }))
        }
    }, [userIds.length])

    //const items = users
    const ths = [
        { txt: "Name", attrPath: [], target: "username" },
        { txt: "Country", attrPath: [], target: "country" },
        { txt: "Level", attrPath: ["leveling"], target: "level" },
        { txt: "Military Rank", attrPath: [], target: "militaryRank" },
        { txt: "Cases Opened", attrPath: ["rankings", "userCasesOpened"], target: "value" }
    ]

    const extendedWorldUsers = users.map(user => extendUser(user))

    return <>
        {!loading.isLoading && users?.length
            ? <SortableTableWithTabs items={extendedWorldUsers} tabs={intelTabs} component="user" key={users.length} />
            : `LOADING ${userIds?.length - users?.length} USERS`}
    </>

}


export default WorldUsers