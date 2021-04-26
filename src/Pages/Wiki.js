import React, { Component } from 'react'
import { Card, Image, Loader, Tab } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import Footer from "../Component/Footer/Footer"
import auth from '../Component/Auth/auth'
import i18n from '../Component/i18n/i18n';
import signup from "../Assets/Images/wiki/signup.jpg"
import signupForm2 from "../Assets/Images/wiki/signupFrom2.jpg"
import signupForm from "../Assets/Images/wiki/signupForm.jpg"
import log from "../Assets/Images/wiki/log.jpg"
import Sign_tab from "../Assets/Images/wiki/Sign_tab.jpg"
import loginForm from "../Assets/Images/wiki/loginForm.png"
import Login from "../Assets/Images/wiki/Login.jpg"
import Login1 from "../Assets/Images/wiki/Login-1.jpg"
import forgotPassword from "../Assets/Images/wiki/forgotPassword.png"
import addPet from "../Assets/Images/wiki/addPet.png"
import addFeature from "../Assets/Images/wiki/addFeature.png"
import Feature from "../Assets/Images/wiki/Feature.png"

export class Wiki extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAdmin: auth.isAdmin,
			loaded: true
		}
	}
	componentDidMount() {
	}
	render() {
		const panes = [
			{
				menuItem: 'Login / Making An Account', render: () =>
					<Tab.Pane>
						<h1 style={{ fontWeight: "bold", textAlign: "left" }}>Creating an Account</h1>
						<p style={{ fontSize: "18px", textAlign: "left" }}>
							One of the first steps on the process to utilizing this pet reunification website to its fullest is to create an account.
							This will grant you access to all the possible features that are available for you to use.
						</p>
						<br />
						<h2 style={{ fontWeight: "bold", textAlign: "left" }}>Sign up</h2>
						<Image style={{ paddingLeft: "25%", width: "75%", paddingBottom: "2%" }} src={signup}></Image>
						<p style={{ fontSize: "18px", textAlign: "left" }}>
							To Navigate to the Signup Page from the home page there is a link in the top right corner of the page
							as depicted in the image (insert where location as opposed to text in this example) in the image above.
						</p>
						<Image style={{ paddingLeft: "25%", width: "75%", paddingBottom: "2%" }} src={signupForm2}></Image>
						<p style={{ fontSize: "18px", textAlign: "left" }}>
							The user is redirected to the signup page where the following information is required:
						</p>
						<ul style={{ fontSize: "18px", textAlign: "left" }}>
							<li>Email: A valid email address that will be provide a base contact information for the user as well as being the username to use on login.</li>
							<li>First Name: This is the first name of the user provided for basic information</li>
							<li>Last Name: This is the last name of the user again provided as basic information</li>
							<li>Phone Number: This is required for contact information for the user in case of potential pet matches.</li>
							<li>Password: A password to keep others from accessing the users account and for verifying login.</li>
						</ul>
						<Image style={{ paddingLeft: "25%", width: "75%", paddingBottom: "2%" }} src={signupForm}></Image>
						<p style={{ fontSize: "18px", textAlign: "left" }}>
							The user can click the sign-up button
						</p>
						<ul style={{ fontSize: "18px", textAlign: "left" }}>
							<li>If all fields are filled in appropriately the user will be automatically logged in and redirected to the home page </li>
							<li>If all fields are not appropriately filled in error messages will display at the fields in red to direct the user on how to fill in the fields accordingly.</li>
						</ul>
						<br />
						<h2 style={{ fontWeight: "bold", textAlign: "left" }}>Login</h2>
						<p style={{ fontSize: "18px", textAlign: "left" }}>
							Once A user has created an account, they can log in one of two ways:
						</p>
						<ul style={{ fontSize: "18px", textAlign: "left" }}>
							<li>First way: Is to click the login tab on the top right corner of any page</li>
						</ul>
						<Image style={{ paddingLeft: "25%", width: "75%", paddingBottom: "2%" }} src={log}></Image>
						<ul style={{ fontSize: "18px", textAlign: "left" }}>
							<li>Second way: At the bottom of the signup page there is a link that says, “Already Have an Account?” This link will redirect the user to the login page. </li>
						</ul>
						<Image style={{ paddingLeft: "25%", width: "75%", paddingBottom: "2%" }} src={Sign_tab}></Image>
						<Image style={{ paddingLeft: "25%", width: "75%", paddingBottom: "2%" }} src={loginForm}></Image>
						<p style={{ fontSize: "18px", textAlign: "left" }}>
							Once the user is directed to the login fields there are two required fields:
						</p>
						<Image style={{ paddingLeft: "25%", width: "75%", paddingBottom: "2%" }} src={loginForm}></Image>
						<ul style={{ fontSize: "18px", textAlign: "left" }}>
							<li>Email: The email address the user used on the signup page for their username/contact information</li>
							<li>Password: The password that was set up during sign up to verify the account</li>
							<li>Once all fields are field the user can click login to be logged in and redirected to the home page of the website. </li>
						</ul>
						<Image style={{ paddingLeft: "25%", width: "75%" }} src={Login}></Image>
					</Tab.Pane>
			},
			{
				menuItem: 'Password Reset', render: () =>
					<Tab.Pane>
						<h1 style={{ fontWeight: "bold", textAlign: "left" }}>Reseting a Password</h1>
						<p style={{ fontSize: "18px", textAlign: "left" }}>
							The next feature that is provided is the ability to reset the current user password, in case the user happens to forget the password.
						</p>
						<ul style={{ fontSize: "18px", textAlign: "left" }}>
							<li>To navigate to the forgot password page the user will start from the login page, which is in the creating an account section of the wiki, and click on the link at the bottom that says, “Forgot Password?” </li>
						</ul>
						<Image style={{ paddingLeft: "25%", width: "75%" }} src={Login1}></Image>
						<ul style={{ fontSize: "18px", textAlign: "left" }}>
							<li>Once on the Forgot password page has loaded the user is prompted to enter their email address that they set up during sign up.</li>
							<ul style={{ fontSize: "18px", textAlign: "left" }}>
								<li>From there the user can click the send reset password email button right below the text box and they will receive an email with a link that will allow them to reset their password.</li>
							</ul>
						</ul>
						<Image style={{ paddingLeft: "25%", width: "75%" }} src={forgotPassword}></Image>
					</Tab.Pane>
			},
			{
				menuItem: 'Adding A Pet', render: () =>
					<Tab.Pane>
						<h1 style={{ fontWeight: "bold", textAlign: "left" }}>Adding a Pet</h1>
						<p style={{ fontSize: "18px", textAlign: "left" }}>
							The next crucial feature of the site is to give the user ability to add pets into the system so the matching process can begin.
						</p>
						<Image style={{ paddingLeft: "25%", width: "75%" }} src={addPet}></Image>
						<ul style={{ fontSize: "18px", textAlign: "left" }}>
							<li>The user accesses the Adding pet page by clicking the Add pet tab in the navigation bar at the top of the webpage. </li>
							<li>From there they will be directed to provide information to the following three categories:  </li>
							<ul style={{ fontSize: "18px", textAlign: "left" }}>
								<li>Animal Information: Animal information is opened on the loading of the page prompts the user to enter basic pet information along with providing photos of the pet for easier matching. The basic information fields include:</li>
								<ul style={{ fontSize: "18px", textAlign: "left" }}>
									<li>Pet Name: The name of the animal </li>
									<li>Pet Type: choose from a list Cat, Dog, Horse, etc. </li>
									<li>Primary Breed: What breed is this animal (if purebred this will be the only breed information needed) </li>
									<li>Secondary breed: If the pet is a mix breed what is the other primary breed it is mixed with. </li>
									<li>Gender: Male or Female </li>
									<li>Altered Status: Has this pet been spayed or neutered </li>
								</ul>
								<li>Pet Features: The next tab for adding a pet is the pet features tab which is where the user can add description of pets. </li>
								<Image style={{ paddingLeft: "25%", width: "75%" }} src={addFeature}></Image>
								<ul style={{ fontSize: "18px", textAlign: "left" }}>
									<li>To start the process of adding features the user must first click the button that’s says Add feature </li>
									<Image style={{ paddingLeft: "25%", width: "75%" }} src={Feature}></Image>
									<li>After the button is clicked, dropped down menus appear to be filled in based on the feature that needs to be added the dropdowns include: </li>
									<ul style={{ fontSize: "18px", textAlign: "left" }}>
										<li>Part: which part of the body the feature is on (leg, paw, back, tail) </li>
										<li>Color: What color is this feature (white, black, orange, brown) </li>
										<li>Feature: what is this feature (spots, stripes) </li>
										<li>Position: what position is this (left, right) </li>
									</ul>
									<li>From here the user can click to add another feature with the same drop downs for however many features the user wants to add </li>
								</ul>
								<li>Pet Location: </li>
							</ul>
						</ul>
					</Tab.Pane>
			},
			{
				menuItem: 'Match Pet', render: () =>
					<Tab.Pane>
						<h1 style={{ fontWeight: "bold", textAlign: "left" }}>Pet Matching</h1>
					</Tab.Pane>
			},
			{
				menuItem: 'Pet Gallery & Rainbow Gallery', render: () =>
					<Tab.Pane>
						<h1 style={{ fontWeight: "bold", textAlign: "left" }}>Pet Gallery & Rainbow Gallery</h1>
					</Tab.Pane>
			},
			this.state.isAdmin ? {
				menuItem: 'Admin Tools', render: () =>
					<Tab.Pane>
						<h1 style={{ fontWeight: "bold", textAlign: "left" }}>Admin Tools</h1>
					</Tab.Pane>
			} : '',
		]
		return (
			<div style={{ paddingTop: "60px" }}>
				<h1>Wiki</h1>
				<div style={{ paddingTop: "1%", paddingBottom: "20%", paddingLeft: "10%", paddingRight: "10%" }}>
					<Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
				</div>
				<Footer />
			</div>
		)
	}
}

export default Wiki
