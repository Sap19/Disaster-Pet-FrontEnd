import React, { Component } from 'react'
import { Button, Form, Message, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import i18n from '../../../../Component/i18n/i18n';

export class ColorEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			colorID: props.match.params.id,
			color: {},
			color_name: '',
			errorMessage: "",
			successMessage: "",
		}
	}
	componentDidMount() {
		this.colorInfo()
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
	async colorInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managecolor', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.colorID
				})
			});
			let result = await res.json();
			if (result.message === "Color Has Been Returned") {
				this.setState({
					color_name: result.Color[0].color,
				})
			}

		} catch (e) {
			this.setState({
				errorMessage: i18n.t("error")
			})
		}
	}
	async updateColorInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managecolor', {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.colorID,
					color: this.state.color_name,
				})
			});
			let result = await res.json();
			if (result.message === "Color Updated") {
				this.setState({
					successMessage: i18n.t("manageColors.updated")
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
					<Button className="backButton" href="/manageColors"> &#8592; {i18n.t("manageColors.back")} </Button>
				</div>
				<h2>{i18n.t("manageColors.editTitle")}</h2>
				<div className="message">
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
				</div>
				<div style={{ paddingLeft: "35%", paddingRight: "35%" }}>
					<Form>
						<Form.Field >
							<label>{i18n.t("manageColors.colorName")}</label>
							<input
								name="color_name"
								placeholder={i18n.t("manageColors.colorName")}
								value={this.state.color_name}
								onChange={e => this.setInputValue('color_name', e.target.value)}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Button
								style={{ width: "100%", }}
								content={i18n.t("manageColors.edit")}
								onClick={this.updateColorInfo.bind(this)}
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

export default ColorEdit