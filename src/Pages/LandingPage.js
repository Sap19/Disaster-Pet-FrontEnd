import React, { Component } from 'react'
import PhotoSlider from '../Component/PhotoSlider/PhotoSlider'
import Footer from "../Component/Footer/Footer"
import "../Assets/Css/LandingPage.css";
import Button from 'react-bootstrap/Button'
import i18n from '../Component/i18n/i18n';

export class LandingPage extends Component {
	render() {
		return (
			<div >
				<PhotoSlider />
				<h1 style={{ padding: "40px", fontWeight: "bold", fontSize: "35px" }}>{i18n.t("landingPage.mission")}</h1>
				<p style={{ paddingLeft: "60px", paddingRight: "60px" }}>
						Our mission at pet reunification is to reunite pets with their families in the wake of natural disasters in California. 
						Every year California suffers from wildfires that destroy miles of property and put families out of their homes. 
						These families often lose everything and are left to rebuild their lives. 
						To make matters worse many pets are separated from their loving homes as the escape for survival. 
						We here at pet reunification we want to make the hardships that these families are going through a little more bearable by reuniting them with their missing families. 
						We hope that you will take your time to look through our site and galleries. 
				</p>
				<div className="row">
					<div className="column1" >
						<h2>{i18n.t("landingPage.aboutUs")}</h2>
						<p style={{ paddingLeft: "30px", paddingRight: "30px" }}>
							We are a team of volunteers from all walks of life in the California area. Many of us have had to go through the hardship of these fires and want to do everything we can to help others going through the same thing. 
							We have teams of workers that go out into the field to locate and trap pets that are Dis homed due to fires. 
							The rest of our team is working behind the scenes on the computers tirelessly matching lost pets with families. 
							We look at every pet and match them by even the smallest detail this could be something as small as a freckle on the right paw that make the match and gets them home. 
							We are passionate about what we do and have many success stories from our services. 
                        </p>
					</div>
					<div className="column1" >
						<h2>{i18n.t("landingPage.petGallery")}</h2>
						<p style={{ paddingLeft: "30px", paddingRight: "30px" }}>
							Please look at our pet gallery pages while you are here. There is both the pet gallery page as well as the rainbow gallery page. 
							The rainbow gallery page has all the pets that unfortunately passed through the rainbow bridge during the disaster. 
							We put this gallery up for any families to find them and get closure without having to continually wonder where their pet is and if they are okay, as well as to pay respects to all animals that lost their lives during such devastating events. 
							In both the pet gallery and rainbow gallery there are filter options at the top of the page which a user can use to sort through all pets currently in our system to narrow down the results to more specific pets. 
                        </p>
						<Button className="button" href="/petGallery" variant="info">{i18n.t("landingPage.learnMore")}</Button>
					</div>
					<div className="column1" style={{ height: "500px"}}>
						<h2>{i18n.t("landingPage.howTo")}</h2>
						<p style={{ paddingLeft: "30px", paddingRight: "30px"}}>
							If you are unsure how our website works and what it has to offer, please go to our Wiki page. 
							This page takes you step by step through the signup process as well as adding a pet and our many other features available. 
							This step-by-step guide is also accompanied by sample images of each of the feature pages that is currently available for the user to utilize. 
							We hope that after reading more about how our site works that you will give us a chance to help you or a loved one locate their pet.  
                        </p>
						<Button className="button" href="/" variant="info">{i18n.t("landingPage.learnMore")}</Button>
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}

export default LandingPage
