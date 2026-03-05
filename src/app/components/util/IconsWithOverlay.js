import React, { Children } from "react"
import { IconContext } from "react-icons"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

export const IconsWithOverlay = ({ providerValue, txts, children }) => {

    return (
        <IconContext.Provider value={providerValue}>
            {
                Children.map(children, (child, index) => {
                    
                    const txt = txts?.[index] || 'default txt'
                    const renderTooltip = (props, txt) => (
                        <Tooltip id="button-tooltip" {...props}>
                            {txt}
                        </Tooltip>
                    )
                    return (
                        <OverlayTrigger overlay={(_props) => renderTooltip(_props, txt)}>
                            {child}
                        </OverlayTrigger>
                    )
                }
                )
            }

        </IconContext.Provider>
    )

}


export default IconsWithOverlay