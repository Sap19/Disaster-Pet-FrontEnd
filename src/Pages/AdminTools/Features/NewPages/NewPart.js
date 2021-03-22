import React, { Component } from 'react'
import { Button, Form, Message, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import i18n from '../../../../Component/i18n/i18n';

export class NewPart extends Component {

	constructor(props) {
		super(props);
		this.state = {
			part: {},
			part_name: '',
			errorMessage: "",
			successMessage: "",
		}
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
	
	async updatePartInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managebodypart', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					bodyPart: this.state.part_name,
				})
			});
			let result = await res.json();
			if (result.message === "New BodyPart Has been Added") {
				this.setState({
					successMessage: i18n.t("manageParts.new")
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
					<Button className="backButton" href="/manageParts"> &#8592; {i18n.t("manageParts.back")} </Button>
				</div>
				<h2>{i18n.t("manageParts.addTitle")}</h2>
				<div className="message">
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
				</div>
				<div style={{ paddingLeft: "35%", paddingRight: "35%" }}>
					<Form>
						<Form.Field >
							<label>{i18n.t("manageParts.partName")}</label>
							<input
								name="part_name"
								placeholder={i18n.t("manageParts.partName")}
								value={this.state.part_name}
								onChange={e => this.setInputValue('part_name', e.target.value)}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Button
								style={{ width: "100%", }}
								content={i18n.t("manageParts.addPart")}
								onClick={this.updatePartInfo.bind(this)}
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

export default NewPart