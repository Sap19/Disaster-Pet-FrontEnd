import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import auth from '../Auth/auth';
import { Dropdown, Form } from 'semantic-ui-react'
import i18n from '../i18n/i18n';

export class NavigationBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			language: [
				{ 'key': 'en', 'value': 'en', 'text': 'en' },
				{ 'key': 'de', 'value': 'de', 'text': 'de' },
				{ 'key': 'es', 'value': 'es', 'text': 'es' },
				{ 'key': 'ru', 'value': 'ru', 'text': 'ru' },
			],
			lng: 'en'
		}
		this.onLanguageChanged = this.onLanguageChanged.bind(this)
	}
	componentDidMount() {
		i18n.on('languageChanged', this.onLanguageChanged)
	}

	componentWillUnmount() {
		i18n.off('languageChanged', this.onLanguageChanged)
	}
	onLanguageChanged(lng) {
		this.setState({
			lng: lng
		})
	}
	changeLanguage = (event, data) => {
		i18n.changeLanguage(data.value)
	}
	logout() {
		auth.logout(() => {
			this.props.history.push('/')
		})
	}
	render() {
		return (
			<div>
				<Navbar collapseOnSelect fixed="top" expand="lg" variant="dark" style={{ backgroundColor: "#3587A4" }} >
					<Navbar.Brand href="/">Disaster Pets</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto">
							{localStorage.getItem('token') &&
								<Nav.Link href="/dashboard">{i18n.t("navBar.dashboard")}</Nav.Link>}
							<Nav.Link href="/">{i18n.t("navBar.home")}</Nav.Link>
							<Nav.Link href="/petGallery">{i18n.t("navBar.petGallery")}</Nav.Link>
							<Nav.Link href="/rainbowGallery">{i18n.t("navBar.rainbow")}</Nav.Link>
							<Nav.Link href="/howTo">{i18n.t("navBar.howTo")}</Nav.Link>

							{localStorage.getItem('token') &&
								<Nav.Link href="/addPet">{i18n.t("navBar.addPet")}</Nav.Link>}
							{auth.getUserId() > 1 &&
								<Nav.Link href="/matchPets">{i18n.t("navBar.matchPet")}</Nav.Link>}
							{auth.getUserId() > 1 &&
								<Nav.Link href="/pdfSelect">{i18n.t("navBar.flyer")}</Nav.Link>}
							{auth.isAdminAuth() &&
								<Nav.Link href="/adminTools">{i18n.t("navBar.admin")}</Nav.Link>}
						</Nav>
						<Nav>
							{!localStorage.getItem('token') &&
								<Nav.Link href="/login">{i18n.t("navBar.login")}</Nav.Link>}
							{!localStorage.getItem('token') &&
								<Nav.Link href="/signup">{i18n.t("navBar.signup")}</Nav.Link>}
							{localStorage.getItem('token') &&
								<Nav.Link href="/" onClick={() => this.logout()} >{i18n.t("navBar.logout")}</Nav.Link>}
						</Nav>
					</Navbar.Collapse>
					<Form.Field>
						<Dropdown
							placeholder='Language'
							name="lng"
							fluid
							defaultValue={localStorage.getItem('i18nextLng')}
							selection
							onChange={this.changeLanguage}
							options={this.state.language}
						/>
					</Form.Field>
				</Navbar>
			</div>
		);
	}
}

export default NavigationBar
