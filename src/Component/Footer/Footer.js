import React, { Component } from 'react'
import "../../Assets/Css/Footer.css"
import Facebook from "../../Assets/Images/Facebook.png"
import Instagram from "../../Assets/Images/Instagram.png"
import Twitter from "../../Assets/Images/Twitter.png"
import i18n from '../i18n/i18n';

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
                        <h5 className="footerHeader" >{i18n.t("footer.contact")}</h5>
                        <h6 className="footerParagraph">{i18n.t("footer.email")}: 123@gmail.com</h6>
                        <h6 className="footerParagraph">{i18n.t("footer.phone")}: 123-125-4121</h6>
                        <h6 className="footerParagraph">{i18n.t("footer.fax")}: 123-125-4122</h6>
                    </div>
                    <div className="col">
                        <h5 className="footerHeader" >{i18n.t("footer.needHelp")}</h5>
                        <a href="/">
                            <h6 className="footerParagraph">{i18n.t("footer.HowtoView")}</h6>
                        </a>
                        <a href="/">
                            <h6 className="footerParagraph">{i18n.t("footer.HowtoReportL")}</h6>
                        </a>
                        <a href="/">
                            <h6 className="footerParagraph">{i18n.t("footer.HowtoReportF")}</h6>
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
