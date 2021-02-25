import React, { Component } from 'react'
import { Button, Form, Message, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import i18n from '../../../../Component/i18n/i18n';

export class RoleEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			roleID: props.match.params.id,
			role: {},
			role_name: '',
			errorMessage: "",
			successMessage: "",
		}
	}
	componentDidMount() {
		this.roleInfo()
	}
	setInputValue(property, val) {
		val = val.trim();
		if (val.length > 500) {
			return;
		}
		this.setState({
			[property]: val,
		})
	}
	async roleInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managerole', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.roleID
				})
			});
			let result = await res.json();
			console.log(result)
			if (result.message === "Single Roles Have Been Returned") {
				this.setState({
					role_name: result.Roles[0].role_name,
				})
			}

		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	async updateRoleInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managerole', {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: parseInt(this.state.roleID),
					role_name: this.state.role_name,
				})
			});
			let result = await res.json();
			if (result.message === "Role updated") {
				this.setState({
					successMessage: "Role Has Been Updated!"
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
					<Button className="backButton" href="/manageRoles"> &#8592; {i18n.t("manageRoles.back")} </Button>
				</div>
				<h2>{i18n.t("manageRoles.editTitle")}</h2>
				<div className="message">
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
				</div>
				<div style={{ paddingLeft: "35%", paddingRight: "35%" }}>
					<Form>
						<Form.Field >
							<label>{i18n.t("manageRoles.roleName")}</label>
							<input
								name="role_name"
								placeholder={i18n.t("manageRoles.roleName")}
								value={this.state.role_name}
								onChange={e => this.setInputValue('role_name', e.target.value)}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Button
								style={{ width: "100%", }}
								content={i18n.t("manageRoles.edit")}
								onClick={this.updateRoleInfo.bind(this)}
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

export default RoleEdit