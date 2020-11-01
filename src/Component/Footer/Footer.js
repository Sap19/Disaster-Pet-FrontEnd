import React, { Component } from 'react'
import "../../Assets/Css/Footer.css"
import Facebook from "../../Assets/Images/Facebook.png"
import Instagram from "../../Assets/Images/Instagram.png"
import Twitter from "../../Assets/Images/Twitter.png"

export class Footer extends Component {
    render() {
        return (
            <div className="main-footer">
                <div className="row">
                    <div className="col">
                        <h5 className="footerHeader" >Pet Disaster</h5>
                        <h6 className="footerParagraph">Lost Pet Finder</h6>
                        <h6 className="footerParagraph">12345 street Ave</h6>
                        <h6 className="footerParagraph">Town, State 123456</h6>
                    </div>
                    <div className="col">
                        <h5 className="footerHeader" >Contact</h5>
                        <h6 className="footerParagraph">Email: 123@gmail.com</h6>
                        <h6 className="footerParagraph">Phone: 123-125-4121</h6>
                        <h6 className="footerParagraph">Fax: 123-125-4122</h6>
                    </div>
                    <div className="col">
                        <h5 className="footerHeader" >Need Help? Check Out These Links</h5>
                        <a href="/">
                            <h6 className="footerParagraph">How To View Pet Gallery</h6>
                        </a>
                        <a href="/">
                            <h6 className="footerParagraph">How to Report Lost Pet</h6>
                        </a>
                        <a href="/">
                            <h6 className="footerParagraph">How to Report Found Pet</h6>
                        </a>
                    </div>
                </div>
                <div className="centerSocialMedia">
                    <a href="https://www.facebook.com/">
                        <img style={{ paddingRight: "10px" }} src={Facebook} alt="Facebook Link" ></img>
                    </a>
                    <a href="https://www.instagram.com/">
                        <img style={{ paddingRight: "10px" }} src={Instagram} alt="Instagram Link" ></img>
                    </a>
                    <a href="https://twitter.com/">
                        <img style={{ paddingRight: "10px" }} src={Twitter} alt="Twitter Link"></img>
                    </a>
                </div>
            </div>
        )
    }
}

export default Footer
