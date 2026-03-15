import React from "react"
import { useSelector } from "react-redux"
import Alert from "react-bootstrap/Alert"
import { ListGroup, ListGroupItem } from "react-bootstrap"
import Spinner from "react-bootstrap/Spinner"


export const LoadingSpinner = (props) => {

    const { loading } = useSelector(state => state.app)

    const { isLoading, requests } = loading || { isLoading: true }

    const foo = Object.groupBy(requests, ({ type }) => type)

    return (
        <>
            {isLoading &&
                <Alert id="loadingSpinner" variant="info">

                    <Spinner />
                    <ListGroup>
                        {Object.keys(foo).map((requestType, i) => {
                            const bla = foo[requestType]
                            const openRequests = bla.length
                            const openRequestsItems = bla.map(x => x.items).reduce((acc, curr) => acc += curr, 0)
                            return (
                                <ListGroupItem variant="info" key={i}>
                                    {`${requestType}: open requests ${openRequests} with ${openRequestsItems} items`}
                                </ListGroupItem>
                            )
                        })}
                    </ListGroup>
                </Alert>}
        </>
    )
}


export default LoadingSpinner