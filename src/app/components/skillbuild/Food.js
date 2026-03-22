import React from "react"
import { ListGroup, ListGroupItem, Button } from "react-bootstrap"
import IconWithPopoverOverlay from "../util/IconWithPopoverOverlay"
import { GiAppleCore, GiBread, GiFishCooked, GiSteak } from "react-icons/gi"
import { useDispatch, useSelector } from "react-redux"
import { setFood } from "../../slices/skillbuildSlice"


export const Food = (props) => {

    const { food } = useSelector(state => state.app.skillbuild)

    const dispatch = useDispatch()

    const handleSetFood = (event, value) => {
        dispatch(setFood(value))
    }

    return (
        <>
            {/* <h6>Set Food</h6> */}
            <ListGroup horizontal>
                <ListGroupItem>
                    <IconWithPopoverOverlay title="No Food">
                        <Button onClick={event => handleSetFood(event, "noFood")}
                            variant={food == "noFood" ? 'success' : 'secondary'}
                            aria-label="noFood">
                            <GiAppleCore size="2em" />
                        </Button>
                    </IconWithPopoverOverlay>
                </ListGroupItem>
                <ListGroupItem>
                    <IconWithPopoverOverlay title="Bread Food">
                        <Button onClick={event => handleSetFood(event, "bread")}
                            variant={food == "bread" ? 'success' : 'secondary'}
                            aria-label="breadFood">
                            <GiBread size="2em" />
                        </Button>
                    </IconWithPopoverOverlay>
                </ListGroupItem>
                <ListGroupItem>
                    <IconWithPopoverOverlay title="Steak Food">
                        <Button onClick={event => handleSetFood(event, "steak")}
                            variant={food == "steak" ? 'success' : 'secondary'}
                            aria-label="steakFood">
                            <GiSteak size="2em" />
                        </Button>
                    </IconWithPopoverOverlay>
                </ListGroupItem>
                <ListGroupItem>
                    <IconWithPopoverOverlay title="Fish Food">
                        <Button onClick={event => handleSetFood(event, "fish")}
                            variant={food == "fish" ? 'success' : 'secondary'}
                            aria-label="fishFood">
                            <GiFishCooked size="2em" />
                        </Button>
                    </IconWithPopoverOverlay>
                </ListGroupItem>
            </ListGroup>
        </>
    )

}


export default Food