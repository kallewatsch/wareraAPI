import React from "react"
import { useSelector } from "react-redux"
import Alert from "react-bootstrap/Alert"
import { ListGroup, ListGroupItem } from "react-bootstrap"
import Spinner from "react-bootstrap/Spinner"


export const LoadingSpinner = (props) => {

    //const { loading } = useSelector(state => state.app)
    const { queries } = useSelector(state => state.wareraApi)
    const { loading } = useSelector(state => state.app)
    //console.log({ queries })

    const pendingRequests = Object.keys(queries).map(key => {
        const query = queries[key]
        const { endpointName, requestId, startedTimeStamp, status } = query
        //status == "pending" && console.log({query})
        const fuckItems = query?.originalArgs?.endpoints?.length || 1
        return { type: endpointName, requestId, status, items: fuckItems }
    }).filter(x => x.status == "pending")

    //const { isLoading, requests } = loading || { isLoading: true }

    const foo = Object.groupBy(pendingRequests, ({ type }) => type)

    return (
        <>

            <Alert id="loadingSpinner" variant="info" /* show={pendingRequests.length > 0} */ show={loading.isLoading}>

                <Spinner />
                <ListGroup>
                    {Object.keys(foo).map((requestType, i) => {
                        const bla = foo[requestType]
                        const openRequests = bla.length
                        console.log({bla})
                        const openRequestsItems = bla.map(x => x.items).reduce((acc, curr) => acc += curr, 0)
                        return (
                            <ListGroupItem variant="info" key={i}>
                                {`${requestType}: open requests ${openRequests} with ${openRequestsItems} items`}
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </Alert>
        </>
    )
}


export default LoadingSpinner