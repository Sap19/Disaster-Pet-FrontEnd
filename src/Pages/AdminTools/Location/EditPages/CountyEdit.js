import React, { Component } from 'react'
import { Button, Form, Message, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import i18n from '../../../../Component/i18n/i18n';

export class CountyEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			countyID: props.match.params.id,
			county: {},
			county_name: '',
			state_name: "",
			errorMessage: "",
			successMessage: "",
		}
	}
	componentDidMount() {
		this.countyInfo()
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
	async countyInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/countymanager', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.countyID
				})
			});
			let result = await res.json();
			console.log(result)
			if (result.message === "Single County Have Been Returned") {
				this.setState({
					county_name: result.locations[0].countyname,
					state_name: result.locations[0].state,
				})
			}

		} catch (e) {
			this.setState({
				errorMessage: i18n.t("error")
			})
		}
	}
	async updateCountyInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/countymanager', {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.countyID,
					countyname: this.state.county_name,
					state: this.state.state_name
				})
			});
			let result = await res.json();
			console.log(result);
			if (result.message === "county updated") {
				this.setState({
					successMessage: i18n.t("manageCounty.updated")
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
				<h2>{i18n.t("manageCounty.editTitle")}</h2>
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
								content={i18n.t("manageCounty.edit")}
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

export default CountyEdit