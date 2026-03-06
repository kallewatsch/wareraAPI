import React from "react"
import { useDispatch, useSelector } from "react-redux"
import SortableTable from "./util/SortableTable"


export const WorldUsers = (props) => {

    const { users } = useSelector(state => state.app)

    const dispatch = useDispatch()

    const items = users
    const ths = [
        { txt: "Name", attrPath: [], target: "username" },
        { txt: "Country", attrPath: [], target: "country" },
        { txt: "Level", attrPath: ["leveling"], target: "level"},
        { txt: "Military Rank", attrPath: [], target: "militaryRank"},
    ]

    return <>
        <SortableTable items={items} ths={ths} component="user" key={items.length} />
    </>

}


export default WorldUsers