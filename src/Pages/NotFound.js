import React, { Component } from 'react'
import notFoundPic from "../Assets/Images/404NotFound.PNG"

export class NotFound extends Component {
    render() {
        return (
            <div style={{paddingTop: "40px"}}>
                <img src={notFoundPic} alt="404 Not Found"></img>
            </div>
        )
    }
}

export default NotFound
