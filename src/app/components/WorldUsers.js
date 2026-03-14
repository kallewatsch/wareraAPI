import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addUsers } from "../slices/usersSlice";
import SortableTable from "./util/table/SortableTable"


export const WorldUsers = (props) => {

    const { users, userIds } = useSelector(state => state.app)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!userIds) return;
        const worldUserIds = userIds.map(x => x.userId)
        const exisintUserIds = users?.map(user => user._id) || []
        const missingUserIds = worldUserIds.filter(id => !exisintUserIds.includes(id))
        if (missingUserIds.length) {
            dispatch(addUsers({ userIds: missingUserIds, chunksize: 800 }))
        }
    }, [userIds.length])

    //const items = users
    const ths = [
        { txt: "Name", attrPath: [], target: "username" },
        { txt: "Country", attrPath: [], target: "country" },
        { txt: "Level", attrPath: ["leveling"], target: "level" },
        { txt: "Military Rank", attrPath: [], target: "militaryRank" },
    ]

    return <>
        {users
            ? <SortableTable items={users} ths={ths} component="user" key={users.length} />
            : 'LOADING USERS'}
    </>

}


export default WorldUsers