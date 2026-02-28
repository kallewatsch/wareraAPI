import React from "react"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import Badge from "react-bootstrap/Badge"
import { GiCoins } from "react-icons/gi"

// this is basicly as User. Move it to user folder?

export const MuDonor = (props) => {

    const { username, amount } = props

    // https://github.com/react-icons/react-icons#configuration NOT YET

    return (
        <ListGroupItem className="mu-donor">
            {username} <Badge text="gold" bg="dark"><GiCoins /></Badge>{amount}
        </ListGroupItem>
    )

}


export default MuDonor