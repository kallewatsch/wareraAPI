import React from "react"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Popover from "react-bootstrap/Popover"
import PopoverBody from "react-bootstrap/PopoverBody"
import PopoverHeader from "react-bootstrap/PopoverHeader"


export const IconWithPopoverOverlay = ({ id, children, title, text }) => {

    const renderTooltip = (props, title, text = "Lorem Ipsum") => (
        <Popover {...props}>
            <PopoverHeader>{title}</PopoverHeader>
            <PopoverBody>{text}</PopoverBody>
        </Popover>
    )
    return (
        <OverlayTrigger overlay={(_props) => renderTooltip(_props, title, text)}>
            {children}
        </OverlayTrigger >
    )
}


export default IconWithPopoverOverlay