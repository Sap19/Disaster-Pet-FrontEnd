import React, { Component } from 'react'
import notFoundPic from "../Assets/Images/404NotFound.PNG"
import "../Assets/Css/NotFound.css"

export class NotFound extends Component {
    render() {
        return (
            <div style={{paddingTop: "40px"}}>
                <img className="not-found-image" src={notFoundPic} alt="404 Not Found"></img>
            </div>
        )
    }
}

export default NotFound
