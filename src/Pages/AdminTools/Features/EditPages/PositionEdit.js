import React, { Component } from 'react'
import { Button, Form, Message, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import i18n from '../../../../Component/i18n/i18n';

export class PositionEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			positionID: props.match.params.id,
			position: {},
			position_name: '',
			errorMessage: "",
			successMessage: "",
		}
	}
	componentDidMount() {
		this.positionInfo()
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
	async positionInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/manageposition', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.positionID
				})
			});
			let result = await res.json();
			console.log(result)
			if (result.message === "Position Has Been Returned") {
				this.setState({
					position_name: result.Position[0].position,
				})
			}

		} catch (e) {
			this.setState({
				errorMessage: i18n.t("error")
			})
		}
	}
	async updatePositionInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/manageposition', {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.positionID,
					position: this.state.position_name,
				})
			});
			let result = await res.json();
			console.log(result);
			if (result.message === "Position Updated") {
				this.setState({
					successMessage: i18n.t("managePositions.updated")
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
					<Button className="backButton" href="/managePositions"> &#8592; {i18n.t("managePositions.back")} </Button>
				</div>
				<h2>{i18n.t("managePositions.editTitle")}</h2>
				<div className="message">
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
				</div>
				<div style={{ paddingLeft: "35%", paddingRight: "35%" }}>
					<Form>
						<Form.Field >
							<label>{i18n.t("managePositions.positionName")}</label>
							<input
								name="position_name"
								placeholder={i18n.t("managePositions.positionName")}
								value={this.state.position_name}
								onChange={e => this.setInputValue('position_name', e.target.value)}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Button
								style={{ width: "100%", }}
								content={i18n.t("managePositions.edit")}
								onClick={this.updatePositionInfo.bind(this)}
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

export default PositionEdit