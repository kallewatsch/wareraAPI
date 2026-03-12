import React from "react"
import { Figure } from "react-bootstrap"
import "./FigureWithContainer.css"


export const FigureWithContainer = ({ figureSrc, figureText, children }) => {
    return (
        <div className="figureWithContainer">
            <Figure className="figureWithContainer-figure">
                <Figure.Image
                    fluid
                    thumbnail
                    width={128}
                    height={128}
                    alt="User Avatar"
                    src={figureSrc}
                />
                {/* <Figure.Caption>
                    <cite>{figureText}</cite>
                </Figure.Caption> */}
            </Figure>
            <div className="figureWithContainer-container">
                {children}
            </div>
        </div>
    )
}


export default FigureWithContainer