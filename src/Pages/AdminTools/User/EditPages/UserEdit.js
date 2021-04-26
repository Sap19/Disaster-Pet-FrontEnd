import React, { Component } from 'react'
import { Button, Dropdown, Form, Message, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import i18n from '../../../../Component/i18n/i18n';
export class UserEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userID: props.match.params.id,
			user: {},
			roles: [],
			fname: '',
			lname: '',
			email: '',
			phone: '',
			phone2: '',
			role: '',
			errorMessage: "",
			successMessage: "",
		}
	}
	componentDidMount() {
		this.userInfo()
	}
	newRoleID = (event, data) => {
		this.setState({
			role: data.value,
		})
	}
	setInputValue(property, val) {
		this.setState({
			[property]: val,
		})
	}
	async userInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/manageuser', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.userID
				})
			});
			let result = await res.json();
			console.log(result)
			let roleArray = []
			if (result.message === "single user has been returned") {
				result.Roles.forEach((role, i) => {
					roleArray.push({ 'key': role.id, 'value': role.id, 'text': role.role_name })
				})
				this.setState({
					fname: result.Users[0].fname,
					lname: result.Users[0].lname,
					email: result.Users[0].email,
					phone: result.Users[0].phone,
					phone2: result.Users[0].phone2,
					role: result.Users[0].role_id,
					roles: roleArray,
				})
			}

		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	async updateUserInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/manageuser', {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: parseInt(this.state.userID),
					email: this.state.email,
					fname: this.state.fname,
					lname: this.state.lname,
					phone: this.state.phone,
					phone2: this.state.phone2,
					role_id: this.state.role,
				})
			});
			let result = await res.json();
			if (result.message === "user updated") {
				this.setState({
					successMessage: "User Has Been Updated!"
				})
			}

		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	render() {
		return (
			<div style={{ paddingTop: "60px" }}>
				<div style={{ paddingLeft: '2%' }}>
					<Button className="backButton" href="/manageUsers"> &#8592; {i18n.t("manageUsers.back")} </Button>
				</div>
				<h2>{i18n.t("manageUsers.edit")}</h2>
				<div className="message">
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
				</div>
				<div style={{ paddingLeft: "35%", paddingRight: "35%" }}>
					<Form>
						<Form.Field >
							<label>{i18n.t("manageUsers.email")}</label>
							<input
								name="email"
								placeholder={i18n.t("manageUsers.email")}
								value={this.state.email}
								onChange={e => this.setInputValue('email', e.target.value)}
							/>
						</Form.Field>
						<Form.Field>
							<label>{i18n.t("manageUsers.fName")}</label>
							<input
								name="fname"
								placeholder={i18n.t("manageUsers.fName")}
								value={this.state.fname}
								onChange={e => this.setInputValue('fname', e.target.value)}
							/>
						</Form.Field>
						<Form.Field >
							<label>{i18n.t("manageUsers.lName")}</label>
							<input
								name="lname"
								placeholder={i18n.t("manageUsers.lName")}
								value={this.state.lname}
								onChange={e => this.setInputValue('lname', e.target.value)}
							/>
						</Form.Field>
						<Form.Field >
							<label>{i18n.t("manageUsers.phone")}1</label>
							<input
								name="phone"
								placeholder={i18n.t("manageUsers.phone")}
								value={this.state.phone}
								onChange={e => this.setInputValue('phone', e.target.value)}
							/>
						</Form.Field>
						<Form.Field >
							<label>{i18n.t("manageUsers.phone")}2</label>
							<input
								name="phone2"
								placeholder={i18n.t("manageUsers.phone")}
								value={this.state.phone2}
								onChange={e => this.setInputValue('phone2', e.target.value)}
							/>
						</Form.Field>
						<Form.Field>
						<label>{i18n.t("manageUsers.role")}</label>
						{this.state.role !== '' ?
							<Dropdown
								placeholder={i18n.t("manageUsers.role")}
								name="role"
								fluid
								defaultValue={this.state.role}
								selection
								onChange={this.newRoleID}
								options={this.state.roles}
							/>:
							<div></div>}
						</Form.Field>
						<Form.Field>
							<Form.Button
								style={{ width: "100%", }}
								content={i18n.t("manageUsers.edit")}
								onClick={this.updateUserInfo.bind(this)}
							//value={0}
							>
							</Form.Button>
						</Form.Field>
					</Form>
				</div>
			</div>
		)
	}
}

export default UserEdit