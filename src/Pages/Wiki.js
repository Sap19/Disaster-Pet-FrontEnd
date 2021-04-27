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
import location from "../Assets/Images/wiki/location.png"
import Dash from "../Assets/Images/wiki/Dash.png"
import petDetail from "../Assets/Images/wiki/petDetail.png"
import petMatch from "../Assets/Images/wiki/petMatch.png"
import PetGallery from "../Assets/Images/wiki/PetGallery.png"
import AdminDash from "../Assets/Images/wiki/AdminDash.png"
import newRoles from "../Assets/Images/wiki/newRoles.png"
import manageRoles from "../Assets/Images/wiki/manageRoles.png"
import manageUsers from "../Assets/Images/wiki/manageUsers.png"

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
								<li>Pet Location: The final portion of adding pets is to include a location for where the pet was lost. </li>
								<Image style={{ paddingLeft: "25%", width: "75%" }} src={location}></Image>
								<li>Pet Location: The final portion of adding pets is to include a location for where the pet was lost. </li>
								<ul style={{ fontSize: "18px", textAlign: "left" }}>
									<li>Address: address where pet was lost </li>
									<li>State: state of the address  </li>
									<li>City: what city the address is in  </li>
									<li>Zip Code: the zip code of the address  </li>
								</ul>
							</ul>
						</ul>
					</Tab.Pane>
			},
			{
				menuItem: 'Dashboard / Pet Detail', render: () =>
					<Tab.Pane>
						<h1 style={{ fontWeight: "bold", textAlign: "left" }}>Dashboard</h1>
						<p style={{ fontSize: "18px", textAlign: "left" }}>
							The dashboard contains the pictures of all the dogs linked to that user.
							If the user is a client, it will be all pets that they added individually.
							If the user is a volunteer this will display all pets that they are currently supposed to be focusing on matching with other pets in the system.
						</p>
						<Image style={{ paddingLeft: "25%", width: "75%" }} src={Dash}></Image>
						<ul style={{ fontSize: "18px", textAlign: "left" }}>
							<li>The dashboard has sqaure sections containing a specific pet and the basic information for that pet. </li>
							<li>From here you can get to the detail page for that specific pet by clicking on the picture of the one you wish to select.  </li>
						</ul>
						<br />
						<h1 style={{ fontWeight: "bold", textAlign: "left" }}>Pet Details</h1>
						<p style={{ fontSize: "18px", textAlign: "left" }}>
							The pet Details page provides all the information available for the specific pet selected.
							This includes basic information, all the provided features, and any location data provided for that pet.
						</p>
						<Image style={{ paddingLeft: "25%", width: "75%" }} src={petDetail}></Image>
						<ul style={{ fontSize: "18px", textAlign: "left" }}>
							<li>Pictured above is a pet detail page for a dog in the system, this page can look different depending on how much information is provided for a pet.  </li>
							<ul style={{ fontSize: "18px", textAlign: "left" }}>
								<li>This example has 1 picture, and 1 feature. This page could incorporate multiple images and multiple features  </li>
							</ul>
						</ul>
					</Tab.Pane>
			},
			{
				menuItem: 'Match Pets', render: () =>
					<Tab.Pane>
						<h1 style={{ fontWeight: "bold", textAlign: "left" }}>Pet Matching</h1>
						<p style={{ fontSize: "18px", textAlign: "left" }}>
							The most important feature of this website is the pet matching page.
							The whole purpose of this site is to reunite lost pets with their families. This means that the found pets need to be matched with lost family pets added to the system.
						</p>
						<Image style={{ paddingLeft: "25%", width: "75%" }} src={petMatch}></Image>
						<ul style={{ fontSize: "18px", textAlign: "left" }}>
							<li>The above image shows the pet matching page on the site </li>
							<li>This page is split in half into two identical halves which allows the user to view images of pets in the database on both sides. </li>
							<ul style={{ fontSize: "18px", textAlign: "left" }}>
								<li>The left side is the search side where you fill in the parameters in the grey box to what pet you are trying to match </li>
								<ul style={{ fontSize: "18px", textAlign: "left" }}>
									<li>If you select an image on the left-hand side, it will fill in the text boxes on the left side </li>
								</ul>
								<li>The right side will automatically be filtered to match the left side to try and generate matches between the two sides. </li>
								<ul style={{ fontSize: "18px", textAlign: "left" }}>
									<li>The user can edit the search parameters on the right side as well.
									This way the user can broaden the matching pets on the right side that way they have more options to look through.
									Since users who added the pet may have not added them the exact same way as the reunification service.
									</li>
								</ul>
							</ul>
						</ul>
					</Tab.Pane>
			},
			{
				menuItem: 'Pet Gallery / Rainbow Gallery', render: () =>
					<Tab.Pane>
						<h1 style={{ fontWeight: "bold", textAlign: "left" }}>Pet Gallery & Rainbow Gallery</h1>
						<p style={{ fontSize: "18px", textAlign: "left" }}>
							One feature that is available whether a user is a registered member is the pet gallery along with the rainbow gallery.
						</p>
						<Image style={{ paddingLeft: "25%", width: "75%" }} src={PetGallery}></Image>
						<ul style={{ fontSize: "18px", textAlign: "left" }}>
							<li>The pet gallery and the rainbow gallery are both set up the same.
							The rainbow gallery is the gallery that contains all the pets that unfortunately crossed the rainbow bridge during the disaster.
								The pet gallery page contains all pets alive, or unknown status in our system </li>
							<li>The page loads up and all pets are displayed under the dropdown menus  </li>
							<ul style={{ fontSize: "18px", textAlign: "left" }}>
								<li>These menus can be used to filter the pets based on the criteria that the user selects </li>
							</ul>
						</ul>
					</Tab.Pane>
			},
			this.state.isAdmin ? {
				menuItem: 'Admin Tools', render: () =>
					<Tab.Pane>
						<h1 style={{ fontWeight: "bold", textAlign: "left" }}>Admin Tools</h1>
						<p>
							The admin tools are available for all admin users is a set of tools to directly edit tables in the database.
						</p>
						<br />
						<h2 style={{ fontWeight: "bold", textAlign: "left" }}>Admin Tool Dashboard </h2>
						<Image style={{ paddingLeft: "25%", width: "75%" }} src={AdminDash}></Image>
						<ul style={{ fontSize: "18px", textAlign: "left" }}>
							<li>The above image is the dashboard for the admin tool menu. </li>
							<li>It includes links to every table in the system that can be edited by the admin </li>
							<ul style={{ fontSize: "18px", textAlign: "left" }}>
								<li>Categories include:  </li>
								<ul style={{ fontSize: "18px", textAlign: "left" }}>
									<li>Users: All tables having direct impact on users  </li>
									<ul style={{ fontSize: "18px", textAlign: "left" }}>
										<li>Users: All current users in the system ( clients, volunteers, and admin) </li>
										<li>Roles: contain all roles (user, admin, volunteer) </li>
									</ul>
									<li>Pets: All tables having to do with pets </li>
									<ul style={{ fontSize: "18px", textAlign: "left" }}>
										<li>Pets table: contains all pets  </li>
										<li>Breeds: contains all breeds in the system  </li>
										<li>Animal type: contains all animal types </li>
										<li>Gender: contains all genders  </li>
										<li>Status: contains status of life data  </li>
										<li>Altered Status contains all altered options (spayed, neutered, intact)  </li>
									</ul>
									<li>Location: all tables having to do with locations  </li>
									<ul style={{ fontSize: "18px", textAlign: "left" }}>
										<li>Location: Table containing all addresses in the system  </li>
									</ul>
									<li>Disaster: All tables having to do with disasters  </li>
									<ul style={{ fontSize: "18px", textAlign: "left" }}>
										<li>Disaster: contains basic information on disasters </li>
									</ul>
									<li>Feature: All feature tables  </li>
									<ul style={{ fontSize: "18px", textAlign: "left" }}>
										<li>Colors: all colors in the database </li>
										<li>Features: All features in the database </li>
										<li>Parts: all body parts currently in the system </li>
										<li>Positions: all positions currently in the system </li>
										<li>Unique Features: all unique features for all pets in the database </li>
									</ul>
								</ul>
							</ul>
						</ul>
						<br />
						<h2 style={{ fontWeight: "bold", textAlign: "left" }}>Management Tools  </h2>
						<Image style={{ paddingLeft: "25%", width: "75%" }} src={manageUsers}></Image>
						<ul style={{ fontSize: "18px", textAlign: "left" }}>
							<li>The above example of a tool is the manage users' tables. </li>
							<ul style={{ fontSize: "18px", textAlign: "left" }}>
								<li>This tool does not give much for options, the admin can search through all the tables as well as edit the users in the system.</li>
								<li>They cannot add new users to the DB </li>
							</ul>
						</ul>
						<Image style={{ paddingLeft: "25%", width: "75%" }} src={manageRoles}></Image>
						<ul style={{ fontSize: "18px", textAlign: "left" }}>
							<li>The next example is the manage roles admin tool. </li>
							<ul style={{ fontSize: "18px", textAlign: "left" }}>
								<li>This tool can edit and add roles into the system </li>
							</ul>
							<li>To add a new role the user will need to click the green button to be redirected to the add new role page  </li>
							<Image style={{ paddingLeft: "25%", width: "75%" }} src={newRoles}></Image>
							<li>The add new role page has a simple layout  </li>
							<ul style={{ fontSize: "18px", textAlign: "left" }}>
								<li>There is only one text box that is for the name of the new role then the user can click the button to confirm the add  </li>
								<ul style={{ fontSize: "18px", textAlign: "left" }}>
									<li>The database will automatically add the id for the role  </li>
								</ul>
								<li>Other adds in the admin tool menu may have more textboxes that are required so the page will provide more text boxes for the admin to fill in. </li>
								<ul style={{ fontSize: "18px", textAlign: "left" }}>
									<li>The ids will still be automatically added for every table  </li>
								</ul>
							</ul>
						</ul>
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
