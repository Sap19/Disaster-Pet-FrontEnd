import React, { Component } from 'react'
import { Button, Form, Message, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import i18n from '../../../../Component/i18n/i18n';

export class NewCounty extends Component {

	constructor(props) {
		super(props);
		this.state = {
			county: {},
			county_name: '',
			state_name: '',
			errorMessage: "",
			successMessage: "",
		}
	}
	setInputValue(property, val) {
		
		this.setState({
			[property]: val,
		})
	}
	
	async updateCountyInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/countymanager', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					countyname: this.state.county_name,
					state: this.state.state_name
				})
			});
			let result = await res.json();
			if (result.message === "County has been added ") {
				this.setState({
					successMessage: i18n.t("manageCounty.new")
				})
			}

		} catch (e) {
			this.setState({
				errorMessage: i18n.t("error")
			})
		}
	}
	render() {
		return (
			<div style={{ paddingTop: "60px" }}>
				<div style={{ paddingLeft: '2%' }}>
					<Button className="backButton" href="/manageCounty"> &#8592; {i18n.t("manageCounty.back")} </Button>
				</div>
				<h2>{i18n.t("manageCounty.addTitle")}</h2>
				<div className="message">
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
				</div>
				<div style={{ paddingLeft: "35%", paddingRight: "35%" }}>
					<Form>
						<Form.Field >
							<label>{i18n.t("manageCounty.countyName")}</label>
							<input
								name="county_name"
								placeholder={i18n.t("manageCounty.countyName")}
								value={this.state.county_name}
								onChange={e => this.setInputValue('county_name', e.target.value)}
							/>
						</Form.Field>
						<Form.Field >
							<label>{i18n.t("manageCounty.state")}</label>
							<input
								name="state_name"
								placeholder={i18n.t("manageCounty.state")}
								value={this.state.state_name}
								onChange={e => this.setInputValue('state_name', e.target.value)}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Button
								style={{ width: "100%", }}
								content={i18n.t("manageCounty.addCounty")}
								onClick={this.updateCountyInfo.bind(this)}
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

export default NewCounty