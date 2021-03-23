import React, { Component } from 'react'
import { Card, Image, Loader, Tab } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import Footer from "../Component/Footer/Footer"
import auth from '../Component/Auth/auth'
import i18n from '../Component/i18n/i18n';

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
				menuItem: 'Making An Account', render: () =>
					<Tab.Pane>
						<h1 style={{ fontWeight: "bold", textAlign: "left" }}>Creating an Account</h1>
					</Tab.Pane>
			},
			{
				menuItem: 'Password Reset', render: () =>
					<Tab.Pane>
						<h1 style={{ fontWeight: "bold", textAlign: "left" }}>Reseting a Password</h1>
					</Tab.Pane>
			},
			{
				menuItem: 'Adding A Pet', render: () =>
					<Tab.Pane>
						<h1 style={{ fontWeight: "bold", textAlign: "left" }}>Adding a Pet</h1>
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
			}:'',
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
