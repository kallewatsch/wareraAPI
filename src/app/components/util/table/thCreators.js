import React from "react"
import IconWithPopoverOverlay from "../IconWithPopoverOverlay"


export const createIconWithOverlayTh = ({ txt, icon, attrPath, target, title }) => {
    const { component, ...iconProps } = icon
    const FooIcon = component
    const iconFoo = <IconWithPopoverOverlay title={title} text={txt}><FooIcon {...iconProps} /></IconWithPopoverOverlay>
    return { icon: iconFoo, txt, attrPath, target }
}